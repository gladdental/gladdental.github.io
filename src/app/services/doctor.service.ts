import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + environment.token
  })
};

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getListTooth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/tooth/`,httpOptions);
  }

  getListWaitingPatient(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/doctor_examination/`, httpOptions);
  }

  getListCategory(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/doctor_treatment/`, httpOptions);
  }

  getListService(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/doctor_service/`, httpOptions);
  }

  filterListService(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/doctor_service/?treatment=${id}`, httpOptions);
  }

  deleteExamination(id:number): Observable<any[]>{
    return this.http.delete<any>(`${this.API}/api/doctor_examination/${id}/`, httpOptions);
  }

  reverseExamination(id:number): Observable<any[]>{
    const json = JSON.stringify({
      is_deleted : false
    });
    return this.http.patch<any>(`${this.API}/api/doctor_examination/${id}/`,json, httpOptions);
  }

  filterDiagnosisByExam(id_exam): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/public/diagnosis/?examination=${id_exam}`, httpOptions);
  }

  deleteDiagnosis(id): Observable<any>{
    return this.http.delete<any>(`${this.API}/api/diagnosis/${id}/`, httpOptions);
  }

  createDiagnosis(note:string, service: number, exam:number, tooths : Array<number>): Observable<any>{
    console.log("note: "+note,"service: "+service,"exam: "+exam,"tooth:"+tooths);
    
    const json = JSON.stringify({
      note : note,
      service : service,
      examination : exam,
      tooth : tooths
    });
    return this.http.post<any>(`${this.API}/api/diagnosis/`,json, httpOptions);
  }

  finishExamination(id:number): Observable<any[]>{
    const json = JSON.stringify({
      is_done : true
    });
    return this.http.patch<any>(`${this.API}/api/doctor_examination/${id}/`,json, httpOptions);
  }

  createShedule(date,time,message,id_exam): Observable<any[]>{
    const json = JSON.stringify({
      date : date,
      time : time,
      detail : message,
      pre_examination : id_exam
    });
    return this.http.post<any>(`${this.API}/api/schedule/re-exam/`,json, httpOptions);
  }

  getScheduler():Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/scheduler/?ordering=date,time`, httpOptions);
  }

}