import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable,Subject } from 'rxjs/Rx';
 
import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class TableService {

  private static pane: JSON;
  public static Panelists: string[]=[];
  constructor(private http: Http) { }

  addToList(obj:string){
    console.log(obj);
    // this.getPanelists().subscribe(
    //   string =>{ TableService.Panelists=string;
    //   }
    // );
  }

  delFromList(obj:string){
    var temp=JSON.parse(obj);
    console.log(temp);
      for(let temp2 of TableService.Panelists){
        var x= JSON.parse(temp2);
        if(x.ID === temp.ID && x.Round === temp.Round){
          TableService.Panelists.splice(TableService.Panelists.indexOf(temp2),1);
          return;
        } 
      }
      alert("Panelist not found");
  }
  
  addPanelist(s:any):Observable<any>{
    console.log('blabla');
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:8080/sptbi/webapi/admin',s, options)
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

    deletePanelist(s:string):Observable<string>{
      console.log(s);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.delete('http://localhost:8080/sptbi/webapi/admin?username='+encodeURIComponent(s))
                 .map(this.extractData)
                 .catch(this.handleErrorObservable);
    }

    getPanelists(){
      console.log('Aashay rocks');
       //return this.http.get('assets/data/panelist.json')
      return this.http.get('http://localhost:8080/sptbi/webapi/admin/getPanelists')
      .flatMap((data) =>data.json());  
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
    
}
