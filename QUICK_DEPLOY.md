# Quick Deployment Guide

Your code is now on GitHub: https://github.com/KyPython/stone-soup-board

## Fastest Deployment Path (5-10 minutes)

### Step 1: Deploy Backend to Railway (Free tier available)

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `stone-soup-board` repository
4. Click "Add Service" → "Empty Service"
5. In settings:
   - **Root Directory**: Set to `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Railway will auto-detect Node.js and deploy
7. Copy the deployment URL (e.g., `https://stone-soup-board-production.up.railway.app`)

### Step 2: Deploy Frontend to Vercel (Free tier)

1. Go to https://vercel.com and sign in with GitHub
2. Click "New Project" → Import `stone-soup-board`
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
4. Add Environment Variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-url.railway.app/api` (use your Railway URL from Step 1)
5. Click "Deploy"

### Step 3: Update Backend CORS (if needed)

If your frontend domain is different, update the backend CORS:
1. In Railway, go to your backend service → Variables
2. Add: `FRONTEND_URL=https://your-vercel-app.vercel.app`
3. Redeploy

## Alternative: Render.com (All-in-one)

### Backend:
1. Go to https://render.com → New → Web Service
2. Connect GitHub → Select `stone-soup-board`
3. Settings:
   - **Root Directory**: `backend`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm start`
4. Deploy and copy URL

### Frontend:
1. Render → New → Static Site
2. Connect GitHub → Select `stone-soup-board`
3. Settings:
   - **Root Directory**: `frontend`
   - **Build**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variable: `REACT_APP_API_URL` = your backend URL
5. Deploy

## Test Your Deployment

1. Visit your frontend URL
2. Create a card in "Ideas" column
3. Move it to "In Progress"
4. Edit the card
5. Move it to "Done"
6. Delete the card

If everything works, you're live! 🎉

## Share Your App

Once deployed, update your README with the live URLs and share:
- Frontend: https://your-app.vercel.app
- Backend API: https://your-backend.railway.app/api

