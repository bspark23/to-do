import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Priority, Label } from '../models/enums';
import { environment } from '../../../environments/environment';

export interface TaskFilters {
  priority?: Priority;
  labels?: Label[];
  startDate?: Date;
  endDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filterTasks(filters: TaskFilters): Observable<Task[]> {
    let queryParams = '';
    const params: string[] = [];

    if (filters.priority) {
      params.push(`priority=${filters.priority}`);
    }
    
    if (filters.labels && filters.labels.length > 0) {
      filters.labels.forEach(label => {
        params.push(`labels_like=${label}`);
      });
    }

    if (params.length > 0) {
      queryParams = '?' + params.join('&');
    }

    return this.http.get<Task[]>(`${this.apiUrl}${queryParams}`);
  }
}