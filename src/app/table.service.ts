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
    this.getPanelists().subscribe(
      string =>{ TableService.Panelists=string;
      }
    );
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
  
  addPanelist(s:string):Observable<string>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('',s, options)
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
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('',s, options)
                 .map(this.extractData)
                 .catch(this.handleErrorObservable);
    }

    getPanelists():Observable<string[]>{
      return this.http.get('addpanelists/names')
                 .map(this.extractData)
                 .catch(this.handleErrorObservable);  
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
