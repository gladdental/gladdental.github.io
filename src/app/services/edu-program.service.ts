import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EduProgram } from './../models/edu-program.model';

@Injectable({
  providedIn: 'root'
})
export class EduProgramService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  getAllEduPrograms(): Observable<EduProgram[]> {
    return this.http.get<EduProgram[]>(`${this.API}/api/edup/`);
  }

  getOneEduProgram(id: number): Observable<EduProgram> {
    return this.http.get<EduProgram>(`${this.API}/api/edup/${id}`);
  }
}
