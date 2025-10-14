import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PersonService } from '../../core/services/person.service';

export class CustomValidators {
  
  static minLengthTrimmed(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const trimmedValue = control.value.toString().trim();
      if (trimmedValue.length < minLength) {
        return { 
          minLengthTrimmed: { 
            requiredLength: minLength, 
            actualLength: trimmedValue.length 
          } 
        };
      }
      
      return null;
    };
  }

  static emailFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);
      
      return isValid ? null : { emailFormat: true };
    };
  }

  static phoneFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const isValid = phoneRegex.test(control.value.replace(/[\s\-\(\)]/g, ''));
      
      return isValid ? null : { phoneFormat: true };
    };
  }

  static uniqueName(personService: PersonService, currentId?: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return personService.getPersons().pipe(
        map(persons => {
          const existingPerson = persons.find(p => 
            p.name.toLowerCase().trim() === control.value.toLowerCase().trim() && 
            p.id !== currentId
          );
          return existingPerson ? { uniqueName: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  static dateRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get('startDate')?.value;
      const endDate = control.get('endDate')?.value;

      if (!startDate || !endDate) {
        return null;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      return start <= end ? null : { dateRange: true };
    };
  }
}