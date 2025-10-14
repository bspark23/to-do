import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary" class="shadow-md">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex items-center space-x-2 sm:space-x-4">
          <mat-icon class="text-xl sm:text-2xl">task_alt</mat-icon>
          <span class="text-lg sm:text-xl font-semibold hidden xs:block">TODO Manager</span>
          <span class="text-lg sm:text-xl font-semibold block xs:hidden">TODO</span>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-4">
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

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <button mat-icon-button [matMenuTriggerFor]="mobileMenu" class="text-white">
            <mat-icon>menu</mat-icon>
          </button>
          <mat-menu #mobileMenu="matMenu">
            <a mat-menu-item routerLink="/tasks">
              <mat-icon class="mr-2">assignment</mat-icon>
              <span>Tasks</span>
            </a>
            <a mat-menu-item routerLink="/persons">
              <mat-icon class="mr-2">people</mat-icon>
              <span>Persons</span>
            </a>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `
})
export class NavigationComponent {}