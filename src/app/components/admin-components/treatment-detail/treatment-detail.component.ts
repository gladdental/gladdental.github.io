import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentService } from 'src/app/services/treatment.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + environment.token,
    // 'enctype': 'multipart/form-data'
  })
};

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.css']
})
export class TreatmentDetailComponent implements OnInit {

  public Editor = ClassicEditor;
  public content: string = ".";
  private detail : string;
  subscriptionParams: Subscription;
  subscription: Subscription;
  public TreatmentDetail = {
    "id": null,
    "name": null,
    "image": null,
    "detail": null
  };
  ImageFile: File = null;
  public API = environment.urlApi;

  constructor(
    public activatedRouterService: ActivatedRoute,
    public routerService: Router,
    public treatmentService: TreatmentService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscriptionParams = this.activatedRouterService.params.subscribe(data => {
      this.subscription = this.treatmentService.getDetailTreatment(data['id']).subscribe(data => {
        this.TreatmentDetail = data;
        this.content = data['detail'];
      });
    });
  }

  onUpdate(id, name) {
    let formData = new FormData();
    if (this.ImageFile != null) {
      formData.append('image', this.ImageFile, this.ImageFile.name);
    }

    formData.append('name', name);
    formData.append('detail', this.detail);
    this.http.patch<any>(`${this.API}/api/treatment/${id}/`, formData, httpOptions).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Cập nhật thành công',
        icon: 'success',
      });
      this.loadData();
    },error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  public onChange({ editor }: ChangeEvent) {
    this.detail = editor.getData();
  }

  onImageSelected(files: FileList) {
    if (files.length > 0) {
      this.ImageFile = files.item(0);
    }
  }

}
