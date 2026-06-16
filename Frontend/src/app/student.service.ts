import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private url = 'http://52.66.242.97:8080/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]>            { return this.http.get<Student[]>(this.url); }
  getById(id: number): Observable<Student>   { return this.http.get<Student>(`${this.url}/${id}`); }
  create(s: Student): Observable<Student>    { return this.http.post<Student>(this.url, s); }
  update(id: number, s: Student): Observable<Student> { return this.http.put<Student>(`${this.url}/${id}`, s); }
  delete(id: number): Observable<void>       { return this.http.delete<void>(`${this.url}/${id}`); }
}
