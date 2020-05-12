import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

  isAdmin = false;

  constructor(
    public routerService: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('username') === 'admin') {
      this.isAdmin = true;
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    this.routerService.navigateByUrl('home');
  }

}
