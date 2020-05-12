import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public API = environment.urlApi;

  constructor(
    public http: HttpClient
  ) { }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.API}/api/student/register/`, student);
  }
}
