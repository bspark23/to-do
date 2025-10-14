import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title class="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <mat-icon class="text-red-500">warning</mat-icon>
      {{ data.title }}
    </h2>
    <mat-dialog-content class="py-4">
      <p class="text-gray-700">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions class="flex justify-end gap-2 p-4">
      <button 
        mat-button 
        (click)="onCancel()"
        class="px-4 py-2 text-gray-600 hover:text-gray-800">
        {{ data.cancelText || 'Cancel' }}
      </button>
      <button 
        mat-raised-button 
        color="warn" 
        (click)="onConfirm()"
        class="px-4 py-2">
        {{ data.confirmText || 'Confirm' }}
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}