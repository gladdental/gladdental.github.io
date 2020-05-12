import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from './../../../services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-diagnosis',
  templateUrl: './doctor-diagnosis.component.html',
  styleUrls: ['./doctor-diagnosis.component.css']
})
export class DoctorDiagnosisComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  public _p: number = 1;
  public _total: number;
  public Diagnosis : any[];
  public Services : any[];
  public detailDiagnosis : object = {
    "cost": null,
    "create_at": null,
    "discount": null,
    "examination": null,
    "id": null,
    "is_deleted": null,
    "note": null,
    "service": {
      "id" : null,
      "name" : null
    },
    "service_cost": null,
    "tooth": null,
    "treatment": null
  };

  constructor(
    public doctorService : DoctorService,
  ) { }

  ngOnInit() {
    this.loadDiagnosis();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDiagnosis(){
    this.subscription = this.doctorService.getListDiagnosis(this._p).subscribe( data => {
      this.Diagnosis = data['results'];
      this._total = data['count'];
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

  changePage(event){
    this._p = event;
    this.subscription = this.doctorService.getListDiagnosis(this._p).subscribe( data => {
      this.Diagnosis = data['results'];
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

  getDiagnosisDetail(id){
    this.detailDiagnosis = this.Diagnosis.find(x => x.id === id);
    this.subscription = this.doctorService.getListService().subscribe(data => {
      this.Services = data;
    },error =>{

    })
    
  }

}
