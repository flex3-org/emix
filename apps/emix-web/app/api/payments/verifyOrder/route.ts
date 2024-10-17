import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import pool from "@/app/lib/db";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_SECRET_KEY as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderId, razorpayPaymentId, razorpaySignature, user_id } =
    await request.json(); // Assuming you send user_id from frontend

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  try {
    // Assuming you have a PostgreSQL setup, updating user credits
    const client = await pool.connect();

    // Check the current user's credits
    const currentCreditsRes = await client.query(
      "SELECT credits_remaining FROM user_credits WHERE user_id = $1",
      [user_id]
    );

    if (currentCreditsRes.rows.length === 0) {
      return NextResponse.json(
        { message: "User credits not found", isOk: false },
        { status: 404 }
      );
    }

    const currentCredits = currentCreditsRes.rows[0].credits_remaining;

    // Update user credits by adding 3000 credits
    const updatedCredits = currentCredits + 3000;

    await client.query(
      "UPDATE user_credits SET credits_remaining = $1, last_updated = NOW() WHERE user_id = $2",
      [updatedCredits, user_id]
    );

    await client.query(
      "UPDATE user_subscriptions SET subscription_plan = $1 WHERE user_id = $2",
      ["basic", user_id]
    );

    // Optionally, log the transaction in a payment history table
    await client.query(
      "INSERT INTO user_payments (user_id, payment_amount, credits_purchased, payment_provider, payment_id, payment_status) VALUES ($1, $2, $3, $4, $5, $6)",
      [user_id, 800, 3000, "Razorpay", razorpayPaymentId, "completed"]
    );

    client.release();

    return NextResponse.json(
      { message: "Payment verified and credits added", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Server error", isOk: false },
      { status: 500 }
    );
  }
}
