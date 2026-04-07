import { NextResponse } from "next/server";

export async function POST(req) {
  const { code } = await req.json();

  if (code === "123456") {
    return NextResponse.json({
      success: true,
      message: "2FA verification successful.",
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid 2FA code.",
    },
    { status: 401 }
  );
}