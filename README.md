This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## DevOps Security Hardening

This repo now keeps the deployment workflow and VM runtime in a tighter security posture without changing the hosting model.

### What changed

- The GitHub Actions workflow now uses narrower action versions, explicit repository-read permissions, immutable image tags based on the commit SHA, and a post-deploy health check before cleanup.
- The Docker image now runs as a non-root user, uses Next.js standalone output, disables the framework powered-by header, and exposes a container healthcheck.
- Local deployment secrets and Azure credential files are excluded from both Git tracking and Docker build context.
- A scheduled cleanup workflow prunes stopped containers and dangling images on the Azure VM so disk usage stays under control.

### Secret handling

- Keep Docker Hub credentials and VM SSH access only in GitHub Secrets.
- Do not commit Azure storage credentials or VM environment files.
- If the app needs Azure Storage on the VM, place `AZURE_STORAGE_CONNECTION_STRING` and `AZURE_STORAGE_CONTAINER_NAME` in a root-owned env file such as `/etc/projwebapp/prod.env` with restrictive permissions, then load it from the VM runtime instead of the repository.
- The Azure helper in `lib/loadCSV-AZURE.js` already reads from environment variables; it does not require hardcoded credentials.

### Deployment flow

1. Push to `main` or trigger the workflow manually.
2. GitHub Actions installs dependencies, runs linting, builds and pushes `bucketmonkey/projwebapp:<sha>` and `bucketmonkey/projwebapp:latest`.
3. The VM pulls the immutable commit tag, replaces the running container, waits for the healthcheck to pass, then prunes stale artifacts.
4. The cleanup workflow runs on a schedule to remove stopped containers and dangling images.

### Evidence to capture

- The workflow run showing the build, push, and SSH deploy steps.
- The SSH log lines showing the container started and the health check passed.
- The output from `docker image prune -f` and `docker container prune -f`.
- A browser or curl check showing the Azure VM still serves the app after deployment.
