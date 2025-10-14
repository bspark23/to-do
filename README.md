# Angular TODO List Management Application

A comprehensive TODO List Management Application built with Angular 20, featuring task and person management with full CRUD operations, filtering, pagination, and validation.

## Features

### Core Features
- **Task Management**: Create, read, update, and delete tasks with comprehensive details
- **Person Management**: Manage people who can be assigned to tasks
- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality for both tasks and persons
- **Advanced Filtering**: Filter tasks by priority (Facile, Moyen, Difficile) and labels (HTML, CSS, NODE JS, JQUERY)
- **Pagination**: Navigate through large datasets efficiently
- **Form Validation**: Comprehensive validation with real-time feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Technical Features
- **Angular 20**: Latest Angular framework with standalone components
- **Angular Material**: Modern UI components and design system
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Type-safe development
- **Reactive Forms**: Advanced form handling with validation
- **HTTP Client**: RESTful API communication
- **json-server**: Mock backend for development

### Data Models

#### Task
- Title (required, min 3 characters)
- Assigned Person (required, with autocomplete)
- Start Date (required)
- End Date (auto-set when completed)
- Priority (Facile, Moyen, Difficile)
- Labels (HTML, CSS, NODE JS, JQUERY - multiple selection)
- Description (required)
- Completion Status

#### Person
- Name (required, min 3 characters, unique)
- Email (required, valid format)
- Phone (required, valid format)

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-todo-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   # Option 1: Run both servers simultaneously
   npm run dev

   # Option 2: Run servers separately
   # Terminal 1: Start json-server (mock backend)
   npm run json-server

   # Terminal 2: Start Angular development server
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - API Endpoints:
     - Tasks: http://localhost:3000/tasks
     - Persons: http://localhost:3000/persons

## Usage Guide

### Task Management
1. Navigate to the Tasks section from the main navigation
2. View all tasks in a paginated table format
3. Use filters to find specific tasks by priority or labels
4. Click "Add Task" to create a new task
5. Use the edit (pencil) icon to modify existing tasks
6. Use the delete (trash) icon to remove tasks
7. When marking a task as completed, the end date is automatically set

### Person Management
1. Navigate to the Persons section from the main navigation
2. View all persons in a searchable table
3. Use the search field to find persons by name, email, or phone
4. Click "Add Person" to create a new person
5. Use the edit (pencil) icon to modify existing persons
6. Use the delete (trash) icon to remove persons

### Validation Rules
- **Person Name**: Minimum 3 characters (after trimming), must be unique
- **Task Title**: Minimum 3 characters (after trimming)
- **Email**: Must be a valid email format
- **Phone**: Must be a valid phone number format
- **Completed Tasks**: End date becomes non-editable when task is marked as completed

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core services and models
│   │   ├── models/              # Data models and interfaces
│   │   └── services/            # HTTP services for API communication
│   ├── features/                # Feature modules
│   │   ├── tasks/               # Task management components
│   │   └── persons/             # Person management components
│   ├── shared/                  # Shared components and utilities
│   │   ├── components/          # Reusable components
│   │   └── validators/          # Custom form validators
│   └── layout/                  # Layout components
│       └── navigation/          # Navigation component
├── styles.css                   # Global styles
└── db.json                      # Mock database for json-server
```

## Available Scripts

- `npm start` - Start Angular development server
- `npm run build` - Build the application for production
- `npm run json-server` - Start json-server mock backend
- `npm run dev` - Start both Angular and json-server simultaneously
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Technologies Used

- **Frontend Framework**: Angular 20
- **UI Components**: Angular Material
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Forms**: Angular Reactive Forms
- **HTTP Client**: Angular HttpClient
- **Mock Backend**: json-server
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## Development Guidelines

### Code Quality
- Use TypeScript for type safety
- Follow Angular style guide conventions
- Use meaningful variable and function names
- Implement proper error handling
- Write unit tests for components and services

### Component Architecture
- Use standalone components
- Implement reactive forms with validation
- Use Angular Material components consistently
- Apply Tailwind CSS for custom styling
- Follow responsive design principles

### API Integration
- Use Angular HttpClient for all HTTP operations
- Implement proper error handling for API calls
- Use observables for asynchronous operations
- Handle loading states and user feedback

## Future Enhancements

### Planned Features
- **Internationalization (i18n)**: Multi-language support with Transloco
- **Export Functionality**: Export tasks to Excel (.xlsx) and PDF (.pdf) formats
- **Advanced Search**: Full-text search across all task fields
- **Task Categories**: Organize tasks into categories
- **Due Date Notifications**: Alert system for approaching deadlines
- **Task Dependencies**: Link related tasks together
- **User Authentication**: Multi-user support with authentication
- **Dashboard**: Analytics and reporting features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
