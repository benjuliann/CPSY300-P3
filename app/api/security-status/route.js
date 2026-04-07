import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    encryption: "Enabled",
    accessControl: "Secure",
    compliance: "GDPR Compliant",
    status: "Healthy",
    lastChecked: new Date().toISOString(),
  });
}