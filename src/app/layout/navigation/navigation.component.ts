import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <mat-icon class="text-2xl">task_alt</mat-icon>
          <span class="text-xl font-semibold">TODO Manager</span>
        </div>
        
        <nav class="flex space-x-4">
          <a 
            mat-button 
            routerLink="/tasks" 
            routerLinkActive="bg-blue-700"
            class="text-white hover:bg-blue-700 px-4 py-2 rounded">
            <mat-icon class="mr-2">assignment</mat-icon>
            Tasks
          </a>
          <a 
            mat-button 
            routerLink="/persons" 
            routerLinkActive="bg-blue-700"
            class="text-white hover:bg-blue-700 px-4 py-2 rounded">
            <mat-icon class="mr-2">people</mat-icon>
            Persons
          </a>
        </nav>
      </div>
    </mat-toolbar>
  `
})
export class NavigationComponent {}