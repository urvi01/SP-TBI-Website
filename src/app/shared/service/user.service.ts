import { Injectable } from "@angular/core";
import {startupForm } from '../models/user.model';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable,Subject } from 'rxjs/Rx';
 
import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from "ngx-webstorage";



@Injectable()
export class UserService{
  userType:number;
  category:string;
  userName:string;

  private clock: Observable<Date>;

  constructor(private http:Http,public sstorage:SessionStorageService) {
    this.clock = Observable.interval(1000).map(tick => new Date()).share(); 
    this.userType=0;
  }
  getClock(): Observable<Date> {
    return this.clock;
  }
 
  sendRound1()    //round1 has started
  {
    return this.http.get('http://localhost:8080/sptbi/webapi/admin?endRound=1')
    .flatMap((data) =>(data.json()));
  }
  sendRound2()  //round2 has started
  {
    return this.http.get('http://localhost:8080/sptbi/webapi/admin?endRound=2')
    .flatMap((data) =>(data.json()));
  }
  getRound()    //round details has started
  {
    return this.http.get('http://localhost:8080/sptbi/webapi/admin/getRoundStatus')
    .flatMap((data) =>Observable.of(data.json()));
  }
  startRegistration(){
    return this.http.get('http://localhost:8080/sptbi/webapi/admin/startRegistration')
    .flatMap((data) =>(data.json()));
  }
  checkPendingWork()
  {
    return this.http.get('http://localhost:8080/sptbi/webapi/admin/getPanelistWithPendingForms')
    // .flatMap((data) =>data.json());
  }
  getPendingWorkNames()
  {
    return this.http.get('http://localhost:8080/sptbi/webapi/admin/getPanelistWithPendingForms')
    .flatMap((data) =>data.json()); 
  }
  gettingUser(username:string,password:string)
  {
    console.log('http://localhost:8080/sptbi/webapi/login?username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password));
    return this.http.get('assets/data/user.json')
    .flatMap((data) =>(data.json()));
   
  //  return this.http.get('http://localhost:8080/sptbi/webapi/login?username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password))          //getting UserType
  //   .flatMap((data) =>Observable.of(data.json()));
  }
  getLimit(){
    return this.http.get('http://localhost:8080/sptbi/webapi/panelist/limit?username='+encodeURIComponent(this.sstorage.retrieve('username')))
    // return this.http.get('panelist/'+this.userName)          //getting UserType
     .flatMap((data) =>Observable.of(data.json()));
  }
  getList()   //sends list of registration forms to panelist
  {
    this.userName=this.sstorage.retrieve('username');
    console.log('http://localhost:8080/sptbi/webapi/panelist?username='+encodeURIComponent(this.sstorage.retrieve('username')));
    
  // return this.http.get('http://localhost:8080/sptbi/webapi/panelist?username='+encodeURIComponent(this.sstorage.retrieve('username')))
    return this.http.get('assets/data/register.json')          //getting UserType
    .flatMap((data) =>Observable.of(data.json()));
  }

  postList(forms)     //posts updated data back to list
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/sptbi/webapi/panelist/update?username='+encodeURIComponent(this.sstorage.retrieve('username')),JSON.stringify(forms), options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);
  }

  getFounderList(formID:number)
  {
    return this.http.get('forms/'+formID)          //getting UserType
    .flatMap((data) =>data.json());
  }
  getFormForFounder()
  {
    //return this.http.get('http://localhost:8080/sptbi/webapi/admin/getFormAndPanelist')
    return this.http.get('assets/data/register.json')          //getting UserType
    .flatMap((data) =>data.json());
  }

  submitRegistration(u:startupForm):Observable<startupForm>
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/sptbi/webapi/startup',JSON.stringify(u), options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);
  }
  verName(name:string)
  {
    console.log('http://localhost:8080/sptbi/webapi/startup?checkStartupName='+encodeURIComponent(name));
    return this.http.get('http://localhost:8080/sptbi/webapi/startup?checkStartupName='+encodeURIComponent(name))
    .flatMap((data) =>Observable.of(data.json()));
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
