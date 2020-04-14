import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RequiredDoctorLoginGuard implements CanActivate {

  constructor(public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('bearToken'));
    if (environment.token == null) {
      this.router.navigate(['login'])
      return false;
    }else if (decodedToken['type'] == 'doctor') return true;
    else if (decodedToken['type'] == 'admin') this.router.navigate(['admin']);
    else if (decodedToken['type'] == 'staff') this.router.navigate(['']);
    return false;
  }

}
