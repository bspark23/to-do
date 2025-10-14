import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';

import { Task } from '../../../../core/models/task.model';
import { Person } from '../../../../core/models/person.model';
import { Priority, Label } from '../../../../core/models/enums';
import { TaskService } from '../../../../core/services/task.service';
import { PersonService } from '../../../../core/services/person.service';
import { CustomValidators } from '../../../../shared/validators/custom-validators';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-semibold text-gray-900 mb-4">
      {{ isEditMode ? 'Edit Task' : 'Add Task' }}
    </h2>
    
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="space-y-4 max-h-96 overflow-y-auto">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Title</mat-label>
          <input 
            matInput 
            formControlName="title" 
            placeholder="Enter task title"
            [class.error-field]="taskForm.get('title')?.invalid && taskForm.get('title')?.touched">
          <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
          <mat-error *ngIf="taskForm.get('title')?.hasError('minLengthTrimmed')">
            Title must be at least 3 characters long
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Assigned Person</mat-label>
          <input 
            matInput 
            formControlName="personName"
            [matAutocomplete]="personAuto"
            placeholder="Search and select a person">
          <mat-autocomplete #personAuto="matAutocomplete" [displayWith]="displayPersonName">
            <mat-option *ngFor="let person of filteredPersons | async" [value]="person">
              {{ person.name }} ({{ person.email }})
            </mat-option>
          </mat-autocomplete>
          <mat-error *ngIf="taskForm.get('personName')?.hasError('required')">
            Please select a person
          </mat-error>
        </mat-form-field>

        <div class="flex flex-col sm:flex-row gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Start Date</mat-label>
            <input 
              matInput 
              [matDatepicker]="startPicker" 
              formControlName="startDate"
              placeholder="Choose a date"
              readonly>
            <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
            <mat-datepicker #startPicker></mat-datepicker>
            <mat-error *ngIf="taskForm.get('startDate')?.hasError('required')">
              Start date is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>End Date</mat-label>
            <input 
              matInput 
              [matDatepicker]="endPicker" 
              formControlName="endDate"
              placeholder="Choose a date (optional)"
              readonly>
            <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
            <mat-datepicker #endPicker></mat-datepicker>
            <mat-error *ngIf="taskForm.hasError('dateRange')">
              End date must be after start date
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option *ngFor="let priority of priorities" [value]="priority">
              {{ priority }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="taskForm.get('priority')?.hasError('required')">
            Priority is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Labels</mat-label>
          <mat-select formControlName="labels" multiple>
            <mat-option *ngFor="let label of labels" [value]="label">
              {{ label }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Description</mat-label>
          <textarea 
            matInput 
            formControlName="description" 
            rows="3"
            placeholder="Enter task description">
          </textarea>
          <mat-error *ngIf="taskForm.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <div class="flex items-center">
          <mat-checkbox 
            formControlName="completed"
            (change)="onCompletedChange($event)">
            Mark as completed
          </mat-checkbox>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="flex flex-col sm:flex-row justify-end gap-2 p-4">
        <button 
          mat-button 
          type="button" 
          (click)="onCancel()"
          class="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1">
          Cancel
        </button>
        <button 
          mat-raised-button 
          color="primary" 
          type="submit"
          [disabled]="taskForm.invalid || isSubmitting"
          class="w-full sm:w-auto px-4 py-2 order-1 sm:order-2">
          {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Save') }}
        </button>
      </mat-dialog-actions>
    </form>
  `
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  priorities = Object.values(Priority);
  labels = Object.values(Label);

  persons: Person[] = [];
  filteredPersons: Observable<Person[]>;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) {
    this.isEditMode = !!data;
    this.taskForm = this.createForm();
    this.filteredPersons = this.taskForm.get('personName')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPersons(value))
    );
  }

  ngOnInit(): void {
    this.loadPersons();
    if (this.data) {
      this.populateFormWithTaskData();
    } else {
      // Set default start date to today for new tasks
      this.taskForm.patchValue({
        startDate: new Date()
      });
    }
  }

  private populateFormWithTaskData(): void {
    if (!this.data) return;
    
    this.taskForm.patchValue({
      title: this.data.title,
      personName: this.data.person,
      startDate: this.parseDate(this.data.startDate),
      endDate: this.parseDate(this.data.endDate),
      priority: this.data.priority,
      labels: this.data.labels || [],
      description: this.data.description,
      completed: this.data.completed
    });
  }

  private parseDate(dateValue: any): Date | null {
    if (!dateValue) return null;
    
    try {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.warn('Invalid date value:', dateValue);
      return null;
    }
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      title: ['', [Validators.required, CustomValidators.minLengthTrimmed(3)]],
      personName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      priority: ['', Validators.required],
      labels: [[]],
      description: ['', Validators.required],
      completed: [false]
    });

    // Add custom validator for date range
    form.addValidators(this.dateRangeValidator);

    return form;
  }

  private dateRangeValidator = (control: AbstractControl) => {
    const form = control as FormGroup;
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRange: true };
    }
    return null;
  }

  private loadPersons(): void {
    this.personService.getPersons().subscribe({
      next: (persons) => {
        this.persons = persons;
      },
      error: (error) => {
        console.error('Error loading persons:', error);
      }
    });
  }

  private filterPersons(value: any): Person[] {
    if (!value || typeof value !== 'string') {
      return this.persons;
    }

    const filterValue = value.toLowerCase();
    return this.persons.filter(person =>
      person.name.toLowerCase().includes(filterValue) ||
      person.email.toLowerCase().includes(filterValue)
    );
  }

  displayPersonName(person: Person): string {
    return person ? person.name : '';
  }

  onCompletedChange(event: any): void {
    if (event.checked) {
      this.taskForm.patchValue({
        endDate: new Date()
      });
      this.taskForm.get('endDate')?.disable();
    } else {
      this.taskForm.get('endDate')?.enable();
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      const formValue = this.taskForm.getRawValue();

      // Trim the title
      formValue.title = formValue.title.trim();

      // Ensure we have a valid person object
      const selectedPerson = typeof formValue.personName === 'object'
        ? formValue.personName
        : this.persons.find(p => p.name === formValue.personName);

      if (!selectedPerson) {
        this.snackBar.open('Please select a valid person', 'Close', { duration: 3000 });
        this.isSubmitting = false;
        return;
      }

      const task: Task = {
        title: formValue.title,
        person: selectedPerson,
        startDate: this.formatDateForSubmission(formValue.startDate),
        endDate: formValue.endDate ? this.formatDateForSubmission(formValue.endDate) : undefined,
        priority: formValue.priority,
        labels: formValue.labels || [],
        description: formValue.description,
        completed: formValue.completed,
        ...(this.isEditMode && { id: this.data!.id })
      };

      const operation = this.isEditMode
        ? this.taskService.updateTask(task)
        : this.taskService.createTask(task);

      operation.subscribe({
        next: (result) => {
          this.snackBar.open(
            `Task ${this.isEditMode ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            `Error ${this.isEditMode ? 'updating' : 'creating'} task`,
            'Close',
            { duration: 3000 }
          );
          console.error('Error saving task:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formatDateForSubmission(date: Date): Date {
    if (!date || !(date instanceof Date)) {
      return new Date();
    }
    return date;
  }
}