import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Task } from '../../../../core/models/task.model';
import { Priority, Label } from '../../../../core/models/enums';
import { TaskService } from '../../../../core/services/task.service';
import { TaskFormComponent } from '../task-form';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatFormFieldModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatTooltipModule
    ],
    template: `
    <div class="container mx-auto p-6">
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center p-6 border-b">
          <h1 class="text-2xl font-bold text-gray-900">Task Management</h1>
          <button 
            mat-raised-button 
            color="primary" 
            (click)="openTaskForm()"
            class="flex items-center gap-2">
            <mat-icon>add</mat-icon>
            Add Task
          </button>
        </div>

        <!-- Filters -->
        <div class="p-6 border-b bg-gray-50">
          <form [formGroup]="filterForm" class="flex flex-wrap gap-4 items-end">
            <mat-form-field appearance="outline" class="min-w-48">
              <mat-label>Priority</mat-label>
              <mat-select formControlName="priority" (selectionChange)="applyFilters()">
                <mat-option value="">All Priorities</mat-option>
                <mat-option *ngFor="let priority of priorities" [value]="priority">
                  {{ priority }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="min-w-48">
              <mat-label>Labels</mat-label>
              <mat-select formControlName="labels" multiple (selectionChange)="applyFilters()">
                <mat-option *ngFor="let label of labels" [value]="label">
                  {{ label }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <button 
              mat-button 
              color="accent" 
              (click)="clearFilters()"
              class="h-12">
              Clear Filters
            </button>
          </form>
        </div>
        
        <div class="p-6">
          <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" class="w-full">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">task</mat-icon>
                    Title
                  </div>
                </th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-sm text-blue-500">assignment</mat-icon>
                    <span class="font-medium">{{ task.title }}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="person">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">person</mat-icon>
                    Assigned To
                  </div>
                </th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm text-green-500">account_circle</mat-icon>
                    {{ task.person?.name || 'Unassigned' }}
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">priority_high</mat-icon>
                    Priority
                  </div>
                </th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex items-center gap-1">
                    <mat-icon [class]="getPriorityIconClass(task.priority)" class="text-sm">
                      {{ getPriorityIcon(task.priority) }}
                    </mat-icon>
                    <span [class]="getPriorityClass(task.priority)">{{ task.priority }}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="labels">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">Labels</th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex flex-wrap gap-1">
                    <span *ngFor="let label of task.labels" 
                          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {{ label }}
                    </span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="startDate">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">event</mat-icon>
                    Start Date
                  </div>
                </th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm text-gray-500">schedule</mat-icon>
                    {{ formatDate(task.startDate) }}
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">info</mat-icon>
                    Status
                  </div>
                </th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex items-center gap-1">
                    <mat-icon [class]="task.completed ? 'text-green-500' : 'text-blue-500'" class="text-sm">
                      {{ task.completed ? 'check_circle' : 'schedule' }}
                    </mat-icon>
                    <span [class]="getStatusClass(task.completed)">
                      {{ task.completed ? 'Completed' : 'In Progress' }}
                    </span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">description</mat-icon>
                    Description
                  </div>
                </th>
                <td mat-cell *matCellDef="let task">
                  <div class="flex items-center gap-2 max-w-xs">
                    <mat-icon class="text-sm text-purple-500">notes</mat-icon>
                    <span class="text-sm text-gray-600 truncate" [matTooltip]="task.description">
                      {{ task.description || 'No description' }}
                    </span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">Actions</th>
                <td mat-cell *matCellDef="let task" class="space-x-2">
                  <button 
                    mat-icon-button 
                    color="primary" 
                    (click)="editTask(task)"
                    matTooltip="Edit task">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button 
                    mat-icon-button 
                    color="warn" 
                    (click)="deleteTask(task)"
                    matTooltip="Delete task">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator 
              [pageSizeOptions]="[5, 10, 20]" 
              showFirstLastButtons>
            </mat-paginator>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    filteredTasks: Task[] = [];
    dataSource: Task[] = [];
    filterForm: FormGroup;
    displayedColumns: string[] = ['title', 'person', 'priority', 'labels', 'startDate', 'status', 'description', 'actions'];

    priorities = Object.values(Priority);
    labels = Object.values(Label);

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.filterForm = this.fb.group({
            priority: [''],
            labels: [[]]
        });
    }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.taskService.getTasks().subscribe({
            next: (tasks) => {
                setTimeout(() => {
                    this.tasks = tasks;
                    this.filteredTasks = [...tasks];
                    this.dataSource = [...tasks];
                });
            },
            error: (error) => {
                this.snackBar.open('Error loading tasks', 'Close', { duration: 3000 });
                console.error('Error loading tasks:', error);
            }
        });
    }

    applyFilters(): void {
        const filters = this.filterForm.value;
        let filtered = [...this.tasks];

        if (filters.priority) {
            filtered = filtered.filter(task => task.priority === filters.priority);
        }

        if (filters.labels && filters.labels.length > 0) {
            filtered = filtered.filter(task =>
                filters.labels.some((label: Label) => task.labels.includes(label))
            );
        }

        this.filteredTasks = filtered;
        this.dataSource = [...filtered];
    }

    clearFilters(): void {
        this.filterForm.reset({
            priority: '',
            labels: []
        });
        this.filteredTasks = [...this.tasks];
        this.dataSource = [...this.tasks];
    }

    openTaskForm(task?: Task): void {
        const dialogRef = this.dialog.open(TaskFormComponent, {
            width: '700px',
            maxHeight: '90vh',
            data: task || null
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadTasks();
            }
        });
    }

    editTask(task: Task): void {
        this.openTaskForm(task);
    }

    deleteTask(task: Task): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Task',
                message: `Are you sure you want to delete "${task.title}"?`,
                confirmText: 'Delete',
                cancelText: 'Cancel'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.deleteTask(task.id!).subscribe({
                    next: () => {
                        this.snackBar.open('Task deleted successfully', 'Close', { duration: 3000 });
                        this.loadTasks();
                    },
                    error: (error) => {
                        this.snackBar.open('Error deleting task', 'Close', { duration: 3000 });
                        console.error('Error deleting task:', error);
                    }
                });
            }
        });
    }

    getPriorityClass(priority: Priority): string {
        switch (priority) {
            case Priority.FACILE:
                return 'px-2 py-1 bg-green-100 text-green-800 text-xs rounded';
            case Priority.MOYEN:
                return 'px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded';
            case Priority.DIFFICILE:
                return 'px-2 py-1 bg-red-100 text-red-800 text-xs rounded';
            default:
                return 'px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded';
        }
    }

    getStatusClass(completed: boolean): string {
        return completed
            ? 'px-2 py-1 bg-green-100 text-green-800 text-xs rounded'
            : 'px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded';
    }

    getPriorityIcon(priority: Priority): string {
        switch (priority) {
            case Priority.FACILE:
                return 'keyboard_arrow_down';
            case Priority.MOYEN:
                return 'remove';
            case Priority.DIFFICILE:
                return 'keyboard_arrow_up';
            default:
                return 'help';
        }
    }

    getPriorityIconClass(priority: Priority): string {
        switch (priority) {
            case Priority.FACILE:
                return 'text-green-500';
            case Priority.MOYEN:
                return 'text-yellow-500';
            case Priority.DIFFICILE:
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    }

    formatDate(date: string | Date | null | undefined): string {
        if (!date) return 'Not set';
        try {
            const dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) return 'Invalid date';
            return dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    }
}