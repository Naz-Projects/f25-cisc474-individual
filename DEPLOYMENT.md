# Deployment Guide

## Understanding Cloudflare Setup

### TanStack Start = Cloudflare Workers (NOT Pages!)

TanStack Start is a **server-side rendered (SSR)** framework that needs:
- ✅ **Cloudflare Workers** - Runs server code for SSR
- ❌ **Cloudflare Pages** - Only for static sites (like plain HTML/CSS/JS)

### Your Current Setup
- **codify-lms** (Worker) ← Use this! ✅
- **f25-cisc474-individual** (Pages) ← Delete or disable this ❌

---

## Deployment Methods

### Method 1: Manual Deploy via CLI (Recommended for Testing)

1. **Login to Cloudflare**:
```bash
npx wrangler login
```

2. **Build and Deploy**:
```bash
cd apps/web-start
npm run build
npm run deploy
```

3. **Your app will be live at**:
```
https://codify-lms.<your-subdomain>.workers.dev
```

---

### Method 2: Automatic Deploy via GitHub Actions

This workflow is already set up in `.github/workflows/deploy-worker.yml`.

**Setup Steps:**

1. **Get Cloudflare API Token**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Copy the token

2. **Add to GitHub Secrets**:
   - Go to your GitHub repo settings
   - Navigate to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Paste your API token
   - Click "Add secret"

3. **Push to main branch**:
```bash
git add .
git commit -m "Setup Cloudflare Workers deployment"
git push origin main
```

The GitHub Action will automatically deploy on every push to `main`!

---

## What About the Pages Project?

You have two options:

### Option A: Delete the Pages Project
1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Find `f25-cisc474-individual`
4. Click Settings → Delete project

### Option B: Disable Auto-Deploy
1. Keep it but disconnect from GitHub
2. This way it won't try to build on every push

---

## Verifying Deployment

After deployment, visit:
- **Worker URL**: https://codify-lms.<your-subdomain>.workers.dev

You should see your landing page!

---

## Troubleshooting

### 404 Error
- Make sure you're visiting the **Worker URL**, not the Pages URL
- Pages URL will NOT work for TanStack Start

### Build Errors
- Run `npm run build` locally first to catch errors
- Check GitHub Actions logs for specific error messages

### CORS Errors
- Backend CORS is already configured for `*.codify-lms.pages.dev`
- You may need to update `apps/api/src/main.ts` with your actual Worker domain

---

## Current Configuration

### Backend (Render)
- URL: https://f25-cisc474-individual-xjk9.onrender.com
- CORS: Configured for localhost and Cloudflare domains

### Frontend (Cloudflare Workers)
- Name: codify-lms
- Environment Variable: VITE_BACKEND_URL set in wrangler.jsonc

---

## Next Steps

1. Run `npx wrangler login` to authenticate
2. Run `cd apps/web-start && npm run deploy` to deploy
3. Visit your Worker URL
4. If it works, set up GitHub Actions for auto-deploy
