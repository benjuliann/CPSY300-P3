import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized", code: 401 },
        { status: 401 }
      ),
    };
  }

  return {
    ok: true,
    session,
  };
}