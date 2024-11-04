import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

const getUserData = async (clerkId: string) => {
  const query = `
        SELECT 
            u.id,
            u.clerk_id,
            u.email,
            u.name,  -- Fetch the full name
            u.profile_image_url,
            uc.credits_remaining
        FROM 
            users u
        LEFT JOIN 
            user_credits uc ON u.id = uc.user_id
        WHERE 
            u.clerk_id = $1;
    `;
  const values = [clerkId];

  const res = await pool.query(query, values);
  return res.rows[0];
};

export async function GET(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  const { clerkId } = params;

  try {
    const userData = await getUserData(clerkId);
    if (userData) {
      return NextResponse.json(userData);
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
