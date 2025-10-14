# Vercel Mock API Deployment Guide

## Overview

This guide shows how to deploy the json-server mock backend to Vercel and connect it with your Netlify frontend.

## Step 1: Deploy Mock Backend to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository with the mock-backend folder

### Deployment Steps

1. **Login to Vercel**
   - Go to https://vercel.com
   - Sign up/login with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - **Important**: Set the root directory to `mock-backend`

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `mock-backend`
   - **Build Command**: `npm install` (leave default)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your API
   - You'll get a URL like: `https://angular-todo-mock-api.vercel.app`

### Test Your API

After deployment, test these endpoints:

- **GET Persons**: `https://your-vercel-url.vercel.app/persons`
- **GET Tasks**: `https://your-vercel-url.vercel.app/tasks`
- **POST Task**: `https://your-vercel-url.vercel.app/tasks`
- **PUT Task**: `https://your-vercel-url.vercel.app/tasks/1`
- **DELETE Task**: `https://your-vercel-url.vercel.app/tasks/1`

## Step 2: Update Angular Environment

1. **Update Production Environment**
   ```typescript
   // src/environments/environment.prod.ts
   export const environment = {
     production: true,
     apiUrl: 'https://your-actual-vercel-url.vercel.app'
   };
   ```

2. **Verify Local Environment**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000'
   };
   ```

## Step 3: Deploy Frontend to Netlify

1. **Build for Production**
   ```bash
   npm run build:prod
   ```

2. **Deploy to Netlify**
   - Your existing Netlify configuration will work
   - The app will automatically use the Vercel API in production

## Step 4: Verify Everything Works

### Test CRUD Operations on Live Site

1. **Create Operations**
   - Add new task
   - Add new person
   - Verify data appears immediately

2. **Read Operations**
   - List all tasks
   - List all persons
   - Apply filters

3. **Update Operations**
   - Edit existing task
   - Edit existing person
   - Mark task as completed

4. **Delete Operations**
   - Delete task
   - Delete person
   - Verify removal

### Test Mobile Responsiveness

- Test on mobile device (≤480px)
- Test on tablet (768px-1024px)
- Test on desktop (≥1024px)
- Verify all CRUD operations work on mobile

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - The index.js file includes CORS headers
   - Vercel should handle CORS automatically

2. **404 Errors on API**
   - Verify the Vercel URL is correct
   - Check that endpoints return JSON data
   - Ensure vercel.json routes are configured properly

3. **Data Not Persisting**
   - Note: Vercel deployments reset data on each deploy
   - For persistent data, you'd need a real database
   - For this mock API, data resets are expected

4. **Build Failures**
   - Ensure Node.js version compatibility
   - Check that json-server version is compatible
   - Verify package.json scripts are correct

### Environment Variables

If needed, you can set environment variables in Vercel:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add variables like `NODE_ENV=production`

## File Structure

Your mock-backend folder should look like this:

```
mock-backend/
├── db.json          # Your mock data (identical to local)
├── index.js         # Express server with json-server
├── package.json     # Dependencies and scripts
└── vercel.json      # Vercel deployment configuration
```

## Data Synchronization

### Keeping Data in Sync

1. **Local Changes**
   - When you update local `db.json`
   - Copy changes to `mock-backend/db.json`
   - Redeploy to Vercel

2. **Production Changes**
   - Data changes made through the live app
   - Will be lost on next Vercel deployment
   - This is expected behavior for a mock API

### Deployment Commands

```bash
# Test locally
cd mock-backend
npm install
npm run dev

# Deploy to Vercel (automatic via GitHub)
git add .
git commit -m "update mock data"
git push origin main
```

## Success Criteria

✅ Vercel API responds to all endpoints
✅ Netlify frontend connects to Vercel API
✅ All CRUD operations work in production
✅ Mobile responsiveness maintained
✅ Data consistency between local and deployed
✅ No CORS errors in browser console

## URLs Template

After deployment, update your documentation with:

- **Frontend (Netlify)**: `https://your-app.netlify.app`
- **Backend API (Vercel)**: `https://your-api.vercel.app`
- **Local Development**: `http://localhost:4200` + `http://localhost:3000`