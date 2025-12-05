# Deployment Guide

This guide covers deploying the Stone Soup Board application to make it publicly accessible.

## Architecture

The application consists of two parts:
- **Backend**: Express API server (runs on port 3001)
- **Frontend**: React SPA (runs on port 3000, connects to backend)

## Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - Recommended

#### Backend Deployment (Railway)

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect it's a Node.js project
5. Set the root directory to `backend`
6. Add environment variable: `PORT=3001` (Railway sets this automatically)
7. Railway will deploy and give you a URL like `https://your-app.railway.app`

#### Backend Deployment (Render)

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: stone-soup-backend
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variable: `PORT=3001` (Render sets this automatically)
6. Deploy

#### Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project" → Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.railway.app/api` (or your Render URL)
5. Deploy

### Option 2: Netlify (Frontend) + Railway/Render (Backend)

Similar to Option 1, but use Netlify for frontend:
- Netlify will auto-detect React app
- Set build command: `cd frontend && npm install && npm run build`
- Set publish directory: `frontend/build`
- Add environment variable: `REACT_APP_API_URL` pointing to your backend

### Option 3: Fly.io (Full Stack)

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Deploy backend:
   ```bash
   cd backend
   fly launch
   ```
3. Deploy frontend:
   ```bash
   cd frontend
   fly launch
   ```
4. Set environment variables accordingly

## Post-Deployment Steps

1. **Update CORS**: Make sure your backend allows requests from your frontend domain
   - Update `backend/src/index.ts` CORS configuration if needed

2. **Update Frontend API URL**: Set `REACT_APP_API_URL` environment variable in your frontend deployment

3. **Test the deployment**: 
   - Visit your frontend URL
   - Create a card
   - Move it between columns
   - Verify everything works

## Environment Variables

### Backend
- `PORT`: Server port (default: 3001)

### Frontend
- `REACT_APP_API_URL`: Backend API URL (e.g., `https://your-backend.railway.app/api`)

## Quick Deploy Scripts

After setting up your GitHub repo, you can use these commands:

```bash
# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/stone-soup-board.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then connect your deployment services to the GitHub repository for automatic deployments on push.

