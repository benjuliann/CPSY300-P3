export async function GET() {
  return Response.json({
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasGithubId: !!process.env.GITHUB_CLIENT_ID,
    hasGithubSecret: !!process.env.GITHUB_CLIENT_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
  });
}