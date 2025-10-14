import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { 
    path: 'tasks', 
    loadComponent: () => import('./features/tasks/components/task-list/task-list.component').then(m => m.TaskListComponent)
  },
  { 
    path: 'persons', 
    loadComponent: () => import('./features/persons/components/person-list/person-list.component').then(m => m.PersonListComponent)
  },
  { path: '**', redirectTo: '/tasks' }
];
