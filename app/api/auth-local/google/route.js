import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    provider: "Google",
    message: "Google OAuth login successful.",
  });
}