import { Person } from './person.model';
import { Priority, Label } from './enums';

export interface Task {
  id?: number;
  title: string;
  person: Person;
  startDate: Date;
  endDate?: Date;
  priority: Priority;
  labels: Label[];
  description: string;
  completed: boolean;
}