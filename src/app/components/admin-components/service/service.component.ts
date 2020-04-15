import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { ServiceService } from './../../../services/service.service';
import { TreatmentService } from './../../../services/treatment.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public service : any[];
  public treatment : any[];
  public ServiceDetail = {
    'id' : 0,
    'name' : 'loading...',
    'cost' : 'loading...',
    'unit' : 'loading...',
    'guarantee' : 'loading...'
  };
  public unit : string = "răng";
  public _p: number = 1;
  public _total: number;

  constructor(
    public serviceService: ServiceService,
    public treatmentService : TreatmentService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.serviceService.getListService(this._p).subscribe( data => {
      this.service = data['results'];
      this._total = data['count'];
    });
    this.subscription = this.treatmentService.getListTreatment().subscribe( data => {
      this.treatment = data['results'];
    });
  }

  detailService(id){
    this.subscription = this.serviceService.getDetailService(id).subscribe( data => {
      this.ServiceDetail = data;
      console.log(this.ServiceDetail);
    })
  }

  onUpdateService(id,name,cost,guarantee){
    try{
      guarantee = parseInt(guarantee);
    }catch(err){
      guarantee = null;
    }
    this.subscription = this.serviceService.updateService(id,name,cost,guarantee).subscribe( data => {
      this.loadData();
      this.ServiceDetail = {
        'id' : 0,
        'name' : 'loading...',
        'cost' : null,
        'unit' : 'loading...',
        'guarantee' : null
      };
    })
  }

  onChangeUnit(event){
    this.unit = event.target.value;
  }

  onCreateService(name,cost,guarantee,treatment){
    this.subscription = this.serviceService.createService(name,cost,this.unit,guarantee,treatment).subscribe( data => {
      this.loadData();
    })
  }

  onDeleteService(id){
    this.subscription = this.serviceService.deleteService(id).subscribe( data => {
      this.loadData();
    })
  }

  changePage(event){
    // console.log(event);
    this._p = event
    this.serviceService.getListService(this._p).subscribe( data => {
      this.service = data['results'];
    },error =>{
      console.log(error);
      
    });
  }
}
