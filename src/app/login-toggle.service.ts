import { Injectable, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoginToggleService {
  public static status="Login";
  public static isAdmin= false;
  public newSubject = new Subject<any>();
  constructor(private http: Http) {}

   loginSuccessful(){
    LoginToggleService.status="Logout";
    LoginToggleService.isAdmin=true;
   }

    admin(){
     return LoginToggleService.isAdmin;
   }

   sendSignal(status:boolean){
    this.newSubject.next(status);
   }
}
