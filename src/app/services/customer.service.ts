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
export class CustomerService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getListCustomer(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/customer/`,httpOptions);
  }

  getPageCustomer(page): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/customer/?page=${page}`,httpOptions);
  }

  filterCustomerByDoctor(page): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/doctor/customer/?page=${page}`,httpOptions);
  }

  searchCustomer(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/customer/?search=${query}`,httpOptions);
  }

  getDetailCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/api/customer/${id}/`,httpOptions);
  }

  updateCustomer(id: number, name: string, phone : string, gender: boolean): Observable<any> {
    const json = JSON.stringify({
      name : name,
      phone : phone,
      gender : gender
    });
    return this.http.patch<any>(`${this.API}/api/customer/${id}/`, json, httpOptions);
  }

  addCustomer(name: string,phone: string,gender: boolean): Observable<any>{
    const json = JSON.stringify({
      name : name,
      phone : phone,
      gender : gender
    });
    return this.http.post<any>(`${this.API}/api/customer/`, json,httpOptions);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/api/customer/${id}/`, httpOptions);
  }

  //examination result
  getListExamResult(page : number):Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/examresult/?page=${page}`, httpOptions);
  }

  filterExamResult(page:number ,customer: number):Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/examresult/?page=${page}&customer=${customer}`, httpOptions);
  }

  getExamResultById(id: number):Observable<any> {
    return this.http.get<any>(`${this.API}/api/examresult/${id}`, httpOptions);
  }

  getListExamination(page : number):Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/public/examination/?page=${page}`, httpOptions);
  }

  filterExaminationByPatient(page: number,id_patient: number):Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/public/examination/?page=${page}&patient=${id_patient}`, httpOptions);
  }

  filterDiagnosisByExam(id_exam:number):Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/public/diagnosis/?examination=${id_exam}`, httpOptions);
  }

}
