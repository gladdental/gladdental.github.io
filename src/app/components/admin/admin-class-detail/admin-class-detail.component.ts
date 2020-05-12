import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-class-detail',
  templateUrl: './admin-class-detail.component.html',
  styleUrls: ['./admin-class-detail.component.scss']
})
export class AdminClassDetailComponent implements OnInit {

  is_admin = false;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('username') === 'admin') {
      this.is_admin = true;
    }
  }

}
