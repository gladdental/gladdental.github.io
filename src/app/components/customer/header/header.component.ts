import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username = '';

  constructor(
    public routerService: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const usname: string = localStorage.getItem('username');
    if ( usname != null || usname !== '') {
      this.username = usname;
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    this.routerService.navigateByUrl('home');
  }

}
