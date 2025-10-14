import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Person } from '../../../../core/models/person.model';
import { PersonService } from '../../../../core/services/person.service';
import { PersonFormComponent } from '../person-form';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule
    ],
    template: `
    <div class="container mx-auto p-6">
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center p-6 border-b">
          <h1 class="text-2xl font-bold text-gray-900">Person Management</h1>
          <button 
            mat-raised-button 
            color="primary" 
            (click)="openPersonForm()"
            class="flex items-center gap-2">
            <mat-icon>add</mat-icon>
            Add Person
          </button>
        </div>
        
        <div class="p-6">
          <mat-form-field appearance="outline" class="w-full mb-4">
            <mat-label>Search persons</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, email, or phone">
            <mat-icon matSuffix class="text-gray-400">search</mat-icon>
          </mat-form-field>

          <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" class="w-full">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">person</mat-icon>
                    Name
                  </div>
                </th>
                <td mat-cell *matCellDef="let person">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-sm text-blue-500">account_circle</mat-icon>
                    <span class="font-medium">{{ person.name }}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">email</mat-icon>
                    Email
                  </div>
                </th>
                <td mat-cell *matCellDef="let person">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm text-green-500">mail</mat-icon>
                    <a [href]="'mailto:' + person.email" class="text-blue-600 hover:underline">
                      {{ person.email }}
                    </a>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm">phone</mat-icon>
                    Phone
                  </div>
                </th>
                <td mat-cell *matCellDef="let person">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-sm text-purple-500">call</mat-icon>
                    <a [href]="'tel:' + person.phone" class="text-blue-600 hover:underline">
                      {{ person.phone }}
                    </a>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="font-semibold">Actions</th>
                <td mat-cell *matCellDef="let person" class="space-x-2">
                  <button 
                    mat-icon-button 
                    color="primary" 
                    (click)="editPerson(person)"
                    matTooltip="Edit person">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button 
                    mat-icon-button 
                    color="warn" 
                    (click)="deletePerson(person)"
                    matTooltip="Delete person">
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
export class PersonListComponent implements OnInit {
    persons: Person[] = [];
    dataSource: Person[] = [];
    displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

    constructor(
        private personService: PersonService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadPersons();
    }

    loadPersons(): void {
        this.personService.getPersons().subscribe({
            next: (persons) => {
                setTimeout(() => {
                    this.persons = persons;
                    this.dataSource = [...persons];
                });
            },
            error: (error) => {
                this.snackBar.open('Error loading persons', 'Close', { duration: 3000 });
                console.error('Error loading persons:', error);
            }
        });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        this.dataSource = this.persons.filter(person =>
            person.name.toLowerCase().includes(filterValue) ||
            person.email.toLowerCase().includes(filterValue) ||
            person.phone.toLowerCase().includes(filterValue)
        );
    }

    openPersonForm(person?: Person): void {
        const dialogRef = this.dialog.open(PersonFormComponent, {
            width: '500px',
            data: person || null
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadPersons();
            }
        });
    }

    editPerson(person: Person): void {
        this.openPersonForm(person);
    }

    deletePerson(person: Person): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Person',
                message: `Are you sure you want to delete ${person.name}?`,
                confirmText: 'Delete',
                cancelText: 'Cancel'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.personService.deletePerson(person.id!).subscribe({
                    next: () => {
                        this.snackBar.open('Person deleted successfully', 'Close', { duration: 3000 });
                        this.loadPersons();
                    },
                    error: (error) => {
                        this.snackBar.open('Error deleting person', 'Close', { duration: 3000 });
                        console.error('Error deleting person:', error);
                    }
                });
            }
        });
    }
}