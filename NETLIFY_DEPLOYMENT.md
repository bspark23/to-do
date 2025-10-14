# Netlify Deployment Guide

## Complete Deployment Setup for Netlify

### Step 1: Deploy Backend API First

Since Netlify only hosts static sites, you need to deploy your backend API to a separate service.

#### Recommended: Deploy to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with your GitHub account

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `angular-todo-api` (or your preferred name)
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid for better performance)

3. **Deploy and Get URL**
   - Render will deploy your API automatically
   - Your API will be available at: `https://angular-todo-api.onrender.com`
   - Copy this URL for the next step

### Step 2: Update Environment Configuration

1. **Update Production Environment**
   ```typescript
   // src/environments/environment.prod.ts
   export const environment = {
     production: true,
     apiUrl: 'https://your-render-service-name.onrender.com'
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

### Step 3: Deploy Frontend to Netlify

#### Option A: Connect GitHub Repository (Recommended)

1. **Login to Netlify**
   - Go to https://netlify.com
   - Sign up/login with GitHub

2. **Create New Site**
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository

3. **Configure Build Settings**
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish directory**: `dist/angular-todo-list/browser`
   - **Node version**: Set in Environment Variables: `NODE_VERSION = 20`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy automatically
   - Your site will be available at: `https://random-name.netlify.app`

#### Option B: Manual Deploy

1. **Build Locally**
   ```bash
   npm run build:prod
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist/angular-todo-list/browser` folder to Netlify
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist/angular-todo-list/browser
   ```

### Step 4: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow DNS configuration instructions

2. **Enable HTTPS**
   - Netlify automatically provides SSL certificates
   - Force HTTPS redirects in site settings

### Step 5: Test Your Deployment

1. **Test API Endpoints**
   - Visit `https://your-render-api.onrender.com/tasks`
   - Visit `https://your-render-api.onrender.com/persons`
   - Should return JSON data

2. **Test Frontend**
   - Visit your Netlify URL
   - Test all CRUD operations
   - Verify mobile responsiveness
   - Check browser console for errors

### Netlify Configuration Files

Your project already includes the necessary configuration:

#### netlify.toml
```toml
[build]
  publish = "dist/angular-todo-list/browser"
  command = "npm install --legacy-peer-deps && npm run build"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### _redirects (for SPA routing)
```
/*    /index.html   200
```

### Environment Variables in Netlify

If you need to set environment variables in Netlify:

1. Go to Site Settings → Environment Variables
2. Add variables like:
   - `NODE_VERSION`: `20`
   - `NPM_FLAGS`: `--legacy-peer-deps`

### Troubleshooting

#### Common Issues

1. **Build Fails**
   - Check Node.js version (should be 20)
   - Verify build command includes `--legacy-peer-deps`
   - Check for TypeScript errors

2. **API Connection Fails**
   - Verify your Render API is deployed and accessible
   - Check CORS configuration in server.js
   - Ensure environment.prod.ts has correct API URL

3. **Routing Issues**
   - Ensure `_redirects` file is in the build output
   - Check netlify.toml redirects configuration

4. **Mobile Layout Issues**
   - Test on actual devices
   - Check responsive breakpoints
   - Verify Tailwind CSS is building correctly

### Performance Optimization

1. **Enable Netlify Features**
   - Asset optimization (automatic)
   - Gzip compression (automatic)
   - CDN distribution (automatic)

2. **Monitor Performance**
   - Use Netlify Analytics
   - Check Core Web Vitals
   - Monitor API response times

### Final URLs

After deployment, you'll have:
- **Frontend**: `https://your-site-name.netlify.app`
- **Backend API**: `https://your-service-name.onrender.com`

Update your README.md with these URLs once deployed!