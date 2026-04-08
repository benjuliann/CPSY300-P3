"use client";
import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    // Small delay to let NextAuth set the session cookie
    setTimeout(() => window.close(), 500);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif" }}>
      <p>Signing you in... you can close this window.</p>
    </div>
  );
}