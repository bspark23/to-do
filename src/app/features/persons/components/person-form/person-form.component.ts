import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Person } from '../../../../core/models/person.model';
import { PersonService } from '../../../../core/services/person.service';
import { CustomValidators } from '../../../../shared/validators/custom-validators';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-semibold text-gray-900 mb-4">
      {{ isEditMode ? 'Edit Person' : 'Add Person' }}
    </h2>
    
    <form [formGroup]="personForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="space-y-4">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Name</mat-label>
          <input 
            matInput 
            formControlName="name" 
            placeholder="Enter person name"
            [class.error-field]="personForm.get('name')?.invalid && personForm.get('name')?.touched">
          <mat-error *ngIf="personForm.get('name')?.hasError('required')">
            Name is required
          </mat-error>
          <mat-error *ngIf="personForm.get('name')?.hasError('minLengthTrimmed')">
            Name must be at least 3 characters long
          </mat-error>
          <mat-error *ngIf="personForm.get('name')?.hasError('uniqueName')">
            This name already exists
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Email</mat-label>
          <input 
            matInput 
            formControlName="email" 
            type="email"
            placeholder="Enter email address"
            [class.error-field]="personForm.get('email')?.invalid && personForm.get('email')?.touched">
          <mat-error *ngIf="personForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="personForm.get('email')?.hasError('emailFormat')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Phone</mat-label>
          <input 
            matInput 
            formControlName="phone" 
            placeholder="Enter phone number"
            [class.error-field]="personForm.get('phone')?.invalid && personForm.get('phone')?.touched">
          <mat-error *ngIf="personForm.get('phone')?.hasError('required')">
            Phone is required
          </mat-error>
          <mat-error *ngIf="personForm.get('phone')?.hasError('phoneFormat')">
            Please enter a valid phone number
          </mat-error>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions class="flex justify-end gap-2 p-4">
        <button 
          mat-button 
          type="button" 
          (click)="onCancel()"
          class="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button 
          mat-raised-button 
          color="primary" 
          type="submit"
          [disabled]="personForm.invalid || isSubmitting"
          class="px-4 py-2">
          {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Save') }}
        </button>
      </mat-dialog-actions>
    </form>
  `
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person | null
  ) {
    this.isEditMode = !!data;
    this.personForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.personForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [
        '', 
        [Validators.required, CustomValidators.minLengthTrimmed(3)],
        [CustomValidators.uniqueName(this.personService, this.data?.id)]
      ],
      email: [
        '', 
        [Validators.required, CustomValidators.emailFormat()]
      ],
      phone: [
        '', 
        [Validators.required, CustomValidators.phoneFormat()]
      ]
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.isSubmitting = true;
      const formValue = this.personForm.value;
      
      // Trim the name
      formValue.name = formValue.name.trim();

      const person: Person = {
        ...formValue,
        ...(this.isEditMode && { id: this.data!.id })
      };

      const operation = this.isEditMode 
        ? this.personService.updatePerson(person)
        : this.personService.createPerson(person);

      operation.subscribe({
        next: (result) => {
          this.snackBar.open(
            `Person ${this.isEditMode ? 'updated' : 'created'} successfully`, 
            'Close', 
            { duration: 3000 }
          );
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            `Error ${this.isEditMode ? 'updating' : 'creating'} person`, 
            'Close', 
            { duration: 3000 }
          );
          console.error('Error saving person:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}