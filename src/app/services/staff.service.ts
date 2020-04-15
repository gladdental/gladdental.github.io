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
export class StaffService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getCustomerById(id : number):Observable<any>{
    return this.http.get<any>(`${this.API}/api/customer/${id}/`, httpOptions)
  }

  createExamination(doctor: number,patient: number, note: string, is_reexam: boolean, id_esr : number){
    let json;
    if(is_reexam == false){
      json = JSON.stringify({
        docter : doctor,
        patient : patient,
        note : note,
        is_reexam : is_reexam
      });
    }else{
       json = JSON.stringify({
        docter : doctor,
        patient : patient,
        note : note,
        is_reexam : is_reexam,
        id_examresult : id_esr
      });
    }
    return this.http.post<any>(`${this.API}/api/examination/`, json, httpOptions);
  }

  //schedule
  getListRegistration(page: number){
    return this.http.get<any[]>(`${this.API}/api/schedule/?page=${page}&is_active=false`, httpOptions);
  }

  filterExamResult(id_patient:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/examresult/?customer=${id_patient}&re_examination=true`, httpOptions)
  }

  getListExamination(page : number):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/examination/?page=${page}`, httpOptions)
  }

  getExaminationById(id : number):Observable<any>{
    return this.http.get<any>(`${this.API}/api/examination/${id}/`, httpOptions)
  }

  createInvolve(id_exam:number):Observable<any>{
    const json = JSON.stringify({
      examination : id_exam
    });
    return this.http.post<any>(`${this.API}/api/involve/`, json, httpOptions)
  }

  updateInvolve(id:number, payment: string,received: number,paid: number):Observable<any>{
    const json = JSON.stringify({
      paid : paid,
      payment : "tiền mặt",
      received : received
    });
    return this.http.patch<any>(`${this.API}/api/involve/${id}/`, json, httpOptions)
  }

  editInvolve(id:number,received: number,paid: number):Observable<any>{
    const json = JSON.stringify({
      paid : paid,
      received : received
    });
    return this.http.patch<any>(`${this.API}/api/involve/${id}/`, json, httpOptions)
  }

  deleteInvolve(id:number):Observable<any>{
    return this.http.post<any>(`${this.API}/api/involve/${id}/`, httpOptions)
  }

  getInvoice(id:number):Observable<any>{
    return this.http.get<any>(`${this.API}/api/involve/${id}/`, httpOptions)
  }

  getListInvoice(page:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/involve/?page=${page}`, httpOptions)
  }

  getDiagnosisByExam(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/diagnosis/?examination=${id}`, httpOptions)
  }

  getScheduleByExam(id):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/?pre_examination=${id}`, httpOptions);
  }

  getScheduleByTime(page):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/?page=${page}&ordering=date,time`, httpOptions);
  }

  approveScheduleRegistration(id: number):Observable<any>{
    const json = JSON.stringify({
      is_active : true
    });
    return this.http.patch<any>(`${this.API}/api/schedule/${id}/`,json, httpOptions);
  }

  updateSchedule(id: number, name, email, phone, date, time, note):Observable<any>{
    const json = JSON.stringify({
      name : name,
      email : email,
      phone : phone,
      date : date,
      time : time,
      note : note
    });
    return this.http.patch<any>(`${this.API}/api/schedule/${id}/`,json, httpOptions);
  }

  getScheduler():Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/scheduler/?ordering=date,time`, httpOptions);
  }

  getFreeTimeList(date):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/freetime/?date=${date}`, httpOptions);
  }

  getUserProfile(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/user/profile/`,httpOptions);
  }
}
