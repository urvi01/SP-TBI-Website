import { Injectable } from "@angular/core";
import {startupForm } from '../models/user.model';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable,Subject } from 'rxjs/Rx';
 
import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class UserService{
  userType:number;
  category:string;
  userName:string;

  constructor(private http:Http) { }
  gettingUser(username:string,password:string)
  {
    return this.http.get(''+username+'password='+password)          //getting UserType
    .flatMap((data) =>data.json());
  }

  getList()   //sends list of registration forms to panelist
  {
    return this.http.get('assets/data/register.json')
   // return this.http.get('panelist/'+this.userName)          //getting UserType
    .flatMap((data) =>data.json());
  }

  postList(forms)     //posts updated data back to list
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('',forms, options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);
  }

  getFounderList(formID:number)
  {
    return this.http.get('forms/'+formID)          //getting UserType
    .flatMap((data) =>data.json());
  }

  submitRegistration(u:startupForm):Observable<startupForm>
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('',u, options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);
  }
  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 

  getFormDetails(FormID:number)
  {
   return  this.http.get(''+FormID)
    .flatMap((data) =>(data.json()));
  }
  getFormFounders(FormID:number)
  {
   return  this.http.get(''+FormID)
    .flatMap((data) =>(data.json()));
  }
  


    /*getUserByname(name:String)
    {
      return this.http.get('/assets/data/register.json')
      .flatMap((data) =>(data.json()));
    }

    changePass(u:User )
    {
      return this.http.flatMap((data) =>(data.json()));
    }
    addUser(u:User)
    {
      return this.http.post('//localhost:8080/api/users',u)
      .flatMap((data) =>(data.json()));
    }
    */
}
