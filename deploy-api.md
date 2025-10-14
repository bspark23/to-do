# API Deployment Instructions for Netlify Frontend

Since you're deploying your frontend to Netlify, you need to deploy your backend API to a separate service. Here are the best options:

## Option 1: Deploy to Render (Recommended for Netlify)

Render works excellently with Netlify deployments and offers reliable free tier hosting.

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub account

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Set Root Directory to `server`
   - Set Build Command to `npm install`
   - Set Start Command to `npm start`
   - Choose Free tier (or paid for better performance)

3. **Configure Service**
   - Service will be available at: `https://your-service-name.onrender.com`
   - Render automatically handles HTTPS and provides reliable uptime

4. **Update Environment File**
   - Copy your Render URL
   - Update `src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-service-name.onrender.com'
   };
   ```

## Option 2: Deploy to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub account

2. **Deploy the API**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose the `server` folder as the root directory
   - Railway will automatically detect the Node.js app and deploy it

3. **Update Environment File**
   - Copy the Railway URL (format: `https://your-app-name.up.railway.app`)
   - Update `src/environments/environment.prod.ts` with your Railway URL

## Option 3: Deploy to Vercel (Backend)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from server directory**
   ```bash
   cd server
   vercel --prod
   ```

3. **Update Environment File**
   - Copy the Vercel URL
   - Update `src/environments/environment.prod.ts` with your Vercel URL

## Netlify + Backend API Setup

### Complete Deployment Flow

1. **Deploy Backend API** (choose Render, Railway, or Vercel)
2. **Update Environment Configuration** with your API URL
3. **Deploy Frontend to Netlify** (will automatically use production environment)

### Testing the API

After deployment, test these endpoints:
- `GET https://your-api-url/persons` - Should return the persons array
- `GET https://your-api-url/tasks` - Should return the tasks array

### CORS Configuration

The server.js file already includes CORS configuration to allow requests from any origin. This is essential for your Netlify-deployed frontend to access the API.

### Netlify Deployment Settings

Your `netlify.toml` is already configured correctly:
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

### Environment URL Examples

```typescript
// Development (local)
apiUrl: 'http://localhost:3000'

// Production with Render
apiUrl: 'https://your-service-name.onrender.com'

// Production with Railway  
apiUrl: 'https://your-app-name.up.railway.app'

// Production with Vercel
apiUrl: 'https://your-api-name.vercel.app'
```