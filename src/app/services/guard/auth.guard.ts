import { Injectable } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        public routerService: Router
    ) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('username') === 'admin' || localStorage.getItem('username').substr(0, 5) === 'teach') {
            return true;
        } else {
            this.routerService.navigateByUrl('');
            return false;
        }
      }
}
