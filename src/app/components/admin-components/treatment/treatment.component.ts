import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreatmentService } from './../../../services/treatment.service';
import * as ClassicEditor from 'node_modules/@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit, OnDestroy {

  public Editor = ClassicEditor;
  private detail: string;
  subscription: Subscription;
  public treatment: any[];
  ImageFile: File = null;

  constructor(
    public treatmentService: TreatmentService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData() {
    this.subscription = this.treatmentService.getListTreatment().subscribe(data => {
      this.treatment = data['results'];
    });
  }

  onImageSelected(files: FileList) {
    if (files.length > 0) {
      this.ImageFile = files.item(0);
    }
  }

  onCreate(name) {
    this.subscription = this.treatmentService.createTreatment(name, this.detail , this.ImageFile).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Tạo mới thành công',
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

  onDelete(id) {
    this.treatmentService.deleteTreatment(id).subscribe(res => {
      this.loadData();
    })
  }

  public onChange({ editor }: ChangeEvent) {
    this.detail = editor.getData();
  }

}
