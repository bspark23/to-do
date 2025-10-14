# Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend API Setup
- [ ] Created `server/` directory with Node.js API
- [ ] Configured `server/package.json` with dependencies
- [ ] Created `server/server.js` with CORS enabled
- [ ] Copied `db.json` to `server/db.json`
- [ ] Tested API locally on port 3000

### Frontend Configuration
- [ ] Created environment files (`environment.ts` and `environment.prod.ts`)
- [ ] Updated services to use environment variables
- [ ] Configured Angular build for production environment replacement
- [ ] Added mobile responsive design to all components
- [ ] Updated Tailwind config with responsive breakpoints

### Mobile Responsiveness
- [ ] Navigation: Hamburger menu for mobile
- [ ] Task List: Card view for mobile, table for desktop
- [ ] Person List: Card view for mobile, table for desktop
- [ ] Forms: Responsive dialog sizing and button layouts
- [ ] Filters: Stack vertically on mobile
- [ ] Pagination: Separate mobile pagination

## 🚀 Deployment Steps

### Step 1: Deploy Mock Backend API to Vercel

#### Vercel Deployment (json-server Mock API)
1. [ ] Create Vercel account at https://vercel.com
2. [ ] Import GitHub repository
3. [ ] Set Root Directory to `mock-backend`
4. [ ] Configure project settings:
   - Framework Preset: Other
   - Build Command: `npm install`
   - Output Directory: (leave empty)
5. [ ] Deploy and copy the Vercel URL (format: `https://your-api.vercel.app`)
6. [ ] Test API endpoints:
   - [ ] GET `/persons` - returns persons array
   - [ ] GET `/tasks` - returns tasks array
   - [ ] POST `/tasks` - creates new task
   - [ ] PUT `/tasks/:id` - updates task
   - [ ] DELETE `/tasks/:id` - deletes task

### Step 2: Update Environment Configuration
1. [ ] Update `src/environments/environment.prod.ts` with your Vercel API URL:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-vercel-api.vercel.app'
   };
   ```

### Step 3: Deploy Frontend to Netlify
1. [ ] Connect GitHub repository to Netlify
2. [ ] Configure build settings:
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Publish directory: `dist/angular-todo-list/browser`
   - Node version: 20
3. [ ] Deploy automatically
4. [ ] Copy the Netlify URL

## 🧪 Post-Deployment Testing

### API Testing
- [ ] Test GET `/persons` endpoint
- [ ] Test GET `/tasks` endpoint
- [ ] Test POST `/persons` (create new person)
- [ ] Test POST `/tasks` (create new task)
- [ ] Test PUT `/persons/:id` (update person)
- [ ] Test PUT `/tasks/:id` (update task)
- [ ] Test DELETE `/persons/:id` (delete person)
- [ ] Test DELETE `/tasks/:id` (delete task)

### Frontend Testing
- [ ] Application loads successfully
- [ ] Navigation works on all screen sizes
- [ ] Can create new tasks and persons
- [ ] Can edit existing tasks and persons
- [ ] Can delete tasks and persons
- [ ] Filters work correctly
- [ ] Pagination works
- [ ] Form validation works
- [ ] Data matches local development

### Mobile Responsiveness Testing
- [ ] Test on mobile device (≤480px)
- [ ] Test on tablet (768px-1024px)
- [ ] Test on desktop (≥1024px)
- [ ] Navigation menu works on mobile
- [ ] Cards display properly on mobile
- [ ] Forms are usable on mobile
- [ ] Buttons are touch-friendly

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)

## 📝 Final Steps

### Documentation
- [ ] Update README.md with deployment URLs
- [ ] Document any deployment-specific configurations
- [ ] Add troubleshooting section

### Repository
- [ ] Commit all changes
- [ ] Push to main branch
- [ ] Create deployment tag/release
- [ ] Update repository description with live URLs

### Verification
- [ ] Both local and deployed versions work identically
- [ ] Same data appears in both environments
- [ ] All CRUD operations work in production
- [ ] Mobile responsiveness works across devices
- [ ] Performance is acceptable on mobile networks

## 🔧 Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure server.js includes proper CORS configuration
2. **API Not Found**: Verify environment.prod.ts has correct API URL
3. **Build Failures**: Check Node.js version compatibility
4. **Mobile Layout Issues**: Verify Tailwind CSS responsive classes

### Environment URLs Template
```typescript
// Local Development
apiUrl: 'http://localhost:3000'

// Vercel Production (Mock API)
apiUrl: 'https://angular-todo-mock-api.vercel.app'

// Alternative: Custom Vercel URL
apiUrl: 'https://your-custom-api-name.vercel.app'
```

## ✨ Success Criteria

- [ ] Frontend deployed and accessible via Netlify URL
- [ ] Backend API deployed and accessible via Railway/Render URL
- [ ] All CRUD operations work in production
- [ ] Data is identical between local and production
- [ ] Application is fully responsive on all devices
- [ ] No console errors in production
- [ ] Performance is acceptable across all screen sizes