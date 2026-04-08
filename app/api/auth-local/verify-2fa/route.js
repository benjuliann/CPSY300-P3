import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "2FA code is required.",
        },
        { status: 400 }
      );
    }

    if (code === "123456") {
      return NextResponse.json(
        {
          success: true,
          message: "2FA verification successful.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid 2FA code.",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify 2FA.",
      },
      { status: 500 }
    );
  }
}