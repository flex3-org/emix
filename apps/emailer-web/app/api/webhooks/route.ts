import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import pool from "@/app/lib/db";

export async function POST(req: Request) {
  // Get Webhook Secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // Ensure required headers are present
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  // Get the request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the secret
  const svix = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  // Verify the signature
  try {
    event = svix.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  // Log the event for debugging purposes
  console.log("Webhook received:", event.type);
  console.log("Webhook data:", event.data);

  // Handle the event (user.created in this example)
  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    // Perform any database updates or other actions based on the webhook data
    console.log(
      `User created: ID=${id}, Email=${email_addresses?.[0]?.email_address}`
    );

    // Store user data in the database
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const insertUserQuery = `
        INSERT INTO users (clerk_id, email, name, profile_image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;
      const { id: userId } = (
        await client.query(insertUserQuery, [
          id,
          email_addresses[0].email_address,
          `${first_name} ${last_name}`,
          image_url,
        ])
      ).rows[0];

      // Insert default subscription plan and credits
      await client.query(
        `
        INSERT INTO user_subscriptions (user_id, subscription_plan, status)
        VALUES ($1, $2, $3)
      `,
        [userId, "free", "active"]
      );

      await client.query(
        `
        INSERT INTO user_credits (user_id, credits_remaining)
        VALUES ($1, $2)
      `,
        [userId, 100]
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error inserting user data:", error);
    } finally {
      client.release();
    }
  }

  // Return a success response
  return new Response("Webhook received successfully", { status: 200 });
}
