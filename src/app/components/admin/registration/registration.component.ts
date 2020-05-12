import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { Register } from 'src/app/models/register.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  registrations: Register[];

  constructor(
    public registerService: RegisterService
  ) { }

  ngOnInit() {
    this.loadRegistrations();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadRegistrations() {
    this.subscription = this.registerService.getAllRegistrations().subscribe( (data: Register[] ) => {
      this.registrations = data;
    });
  }

  approve(id: number) {
    // alert(id);
    this.registerService.approveRegistration(id).subscribe( (data: Register) => {
      Swal.fire({
        title: '<strong>Approved successfully!</strong>',
        text: 'This registration has been approved!',
        type: 'success',
      }).then((result) => {
        window.location.reload();
      });
    }, error => {
      console.log(error);
      Swal.fire({
        title: '<strong>Approved unsuccessfully!</strong>',
        text: 'This registration has not been approved!',
        type: 'error'
      });
    });
  }

}
