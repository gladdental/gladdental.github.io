import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Subject } from '../models/subjects.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.API}/api/subject/`);
  }

  getOneSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.API}/api/subject/${id}`);
  }

}
