# Angular TODO Mock API

This is the mock backend API for the Angular TODO List Management Application, deployed on Vercel.

## Overview

This mock API uses json-server to provide RESTful endpoints for the Angular frontend. It maintains the same data structure as the local development environment.

## Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Persons
- `GET /persons` - Get all persons
- `GET /persons/:id` - Get person by ID
- `POST /persons` - Create new person
- `PUT /persons/:id` - Update person
- `DELETE /persons/:id` - Delete person

## Local Development

```bash
npm install
npm run dev
```

The API will be available at `http://localhost:3000`

## Deployment

This API is deployed on Vercel. Any push to the main branch will trigger automatic deployment.

**Live API URL**: https://angular-todo-mock-api.vercel.app

## Data Structure

### Task Object
```json
{
  "id": "string",
  "title": "string",
  "person": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string"
  },
  "startDate": "ISO date string",
  "endDate": "ISO date string or null",
  "priority": "Facile | Moyen | Difficile",
  "labels": ["HTML", "CSS", "NODE JS", "JQUERY"],
  "description": "string",
  "completed": boolean
}
```

### Person Object
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

## CORS Configuration

The API includes CORS headers to allow requests from any origin, enabling the Netlify-deployed frontend to access the API without issues.

## Notes

- This is a mock API for development and demonstration purposes
- Data is reset on each deployment (expected behavior)
- For production applications, use a real database and backend service