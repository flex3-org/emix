"use server";

import pool from "../lib/db";

export async function deductCredits(clerkId: string, amount: number) {
  if (!clerkId || !amount) {
    throw new Error("Missing clerkId or amount");
  }

  try {
    // Step 1: Fetch user_id using clerk_id from the users table
    const getUserIdQuery = `
      SELECT id FROM users WHERE clerk_id = $1;
    `;
    const userResult = await pool.query(getUserIdQuery, [clerkId]);
    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }
    const userId = userResult.rows[0].id;

    // Step 2: Deduct credits from user_credits using the fetched user_id
    const deductCreditsQuery = `
      UPDATE user_credits 
      SET credits_remaining = credits_remaining - $1,
          last_updated = NOW()
      WHERE user_id = $2 AND credits_remaining >= $1
      RETURNING credits_remaining;
    `;
    const deductCreditsValues = [amount, userId];
    const deductResult = await pool.query(
      deductCreditsQuery,
      deductCreditsValues
    );

    if (deductResult.rows.length > 0) {
      return { credits_remaining: deductResult.rows[0].credits_remaining };
    } else {
      throw new Error("Not enough credits or user not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Database error: " + (error as Error).message);
  }
}
