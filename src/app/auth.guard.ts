import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginToggleService } from './login-toggle.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private login: LoginToggleService, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.login.admin()){
        return true;
      }
      else{
        this.router.navigate(['/user-profile']);
        alert("Please Login");
      }
  }
}
