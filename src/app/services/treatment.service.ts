import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + environment.token
  })
};

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getListTreatment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/treatment/`,httpOptions);
  }

  getDetailTreatment(id): Observable<any> {
    return this.http.get<any>(`${this.API}/api/treatment/${id}/`, httpOptions);
  }

  updateTreatment(id: number, name: string, detail: string, image: File){
    console.log(image);
    const fd = new FormData();
    fd.append('image', image, image.name)

    const json = JSON.stringify({
      image : image
    });
    return this.http.patch<any>(`${this.API}/api/treatment/${id}/`, fd, httpOptions);
  }

  createTreatment(name: string, detail: string, image: File){
    let formData = new FormData();
    if(image != null){
      formData.append('image', image, image.name);
    }else{
      formData.append('image', image);
    }
    formData.append('name', name);
    formData.append('detail', detail);
    return this.http.post<any>(`${this.API}/api/treatment/`, formData, httpOptions);
  }

  deleteTreatment(id: number){
    return this.http.delete<any>(`${this.API}/api/treatment/${id}/`, httpOptions);
  }
}
