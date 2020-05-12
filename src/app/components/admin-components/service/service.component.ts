import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from './../../../services/service.service';
import { TreatmentService } from './../../../services/treatment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public service: any[];
  public treatment: any[];
  public ServiceDetail = {
    'id': 0,
    'name': 'loading...',
    'cost': 'loading...',
    'unit': 'loading...',
    'guarantee': 'loading...'
  };
  public unit: string = "răng";
  public _p: number = 1;
  public _total: number;

  constructor(
    public serviceService: ServiceService,
    public treatmentService: TreatmentService
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
    this.subscription = this.serviceService.getListService(this._p).subscribe(data => {
      this.service = data['results'];
      this._total = data['count'];
    });
    this.subscription = this.treatmentService.getListTreatmentNonePage().subscribe(data => {
      this.treatment = data;
    });
  }

  detailService(id) {
    this.subscription = this.serviceService.getDetailService(id).subscribe(data => {
      this.ServiceDetail = data;
      console.log(this.ServiceDetail);
    })
  }

  onUpdateService(id, name, cost, guarantee) {
    try {
      guarantee = parseInt(guarantee);
    } catch (err) {
      guarantee = null;
    }
    this.subscription = this.serviceService.updateService(id, name, cost, guarantee).subscribe(data => {
      this.loadData();
      this.ServiceDetail = {
        'id': 0,
        'name': 'loading...',
        'cost': null,
        'unit': 'loading...',
        'guarantee': null
      };
    })
  }

  onChangeUnit(event) {
    this.unit = event.target.value;
  }

  onCreateService(name, cost, guarantee, treatment) {
    this.subscription = this.serviceService.createService(name, cost, this.unit, guarantee, treatment).subscribe(data => {
      this.loadData();
      Swal.fire({
        title: 'Success',
        text: 'Khôi phục mật khẩu thành công',
        icon: 'success',
      });
      (document.getElementById('servicename') as HTMLInputElement).value = "";
      (document.getElementById('servicecost') as HTMLInputElement).value = "";
      (document.getElementById('serviceguarantee') as HTMLInputElement).value = "";
    }, error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    })
  }

  onDeleteService(id) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa dịch vụ này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.subscription = this.serviceService.deleteService(id).subscribe(data => {
          this.loadData();
          Swal.fire(
            'Đã xóa!',
            'Xóa thành công.',
            'success'
          )
        });
      }
    });
  }

  changePage(event) {
    this._p = event;
    this.serviceService.getListService(this._p).subscribe(data => {
      this.service = data['results'];
    }, error => {
      console.log(error);

    });
  }

  updateCost(id, cost) {
    this.subscription = this.serviceService.updateCostService(id, cost).subscribe(data => {
      this.loadData();
      this.ServiceDetail = {
        'id': 0,
        'name': 'loading...',
        'cost': null,
        'unit': 'loading...',
        'guarantee': null
      };
    })
  }
}
