import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-history',
  templateUrl: './staff-history.component.html',
  styleUrls: ['./staff-history.component.css']
})
export class StaffHistoryComponent implements OnInit {

  subscriptionParams: Subscription;
  subscription: Subscription;
  public Customer = {};

  constructor(
    public activatedRouterService: ActivatedRoute,
    public routerService: Router,
    public staffService: StaffService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.subscriptionParams = this.activatedRouterService.params.subscribe(data => {
      this.subscription = this.staffService.getCustomerById(data['id']).subscribe( data => {
        this.Customer = data;
        console.log(this.Customer);
        
      });
    });
  }

}
