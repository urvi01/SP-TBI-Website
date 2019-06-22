import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { all } from 'q';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers:[SessionStorageService]
})
export class TableListComponent implements OnInit {

  private static cat: string;
  private static rou :string;  
  @Input()uname:string;
  message=false;
  Panelists=[];
  sorts=[];
  sorts1=[];
  @Input()Roundno:string;
  @Input()Category1:string;

  private static obj: any;
  private static output: string;
  constructor(private Table: TableService, private router: Router,public sstorage:SessionStorageService) {
    
  }


  ngOnInit() {
      this.Table.getPanelists().subscribe((data)=>
    {
      console.log(data);
        this.Panelists.push(data);
        this.Roundno='All';   
        this.Category1='All'; 
        this.ConvergeCat('All');
        this.ConvergeRound('All');
    });
   

    
  }
  MakeObject(e){
    console.log(this.uname);
    console.log(e.target.elements[0].value);
    if(e.target.elements[0].value === "" || e.target.elements[2].value === "" || e.target.elements[3].value === "" || e.target.elements[4].value === "" || e.target.elements[1].value === ""){
      alert("Some Fields are missing");
      return;
    }	
    TableListComponent.obj={"round":e.target.elements[2].value,"username":e.target.elements[0].value, "password":e.target.elements[1].value,"selectionLimit":e.target.elements[4].value,"category":e.target.elements[3].value};
    TableListComponent.output=TableListComponent.obj;
    console.log(TableListComponent.output);
    this.Table.addToList(TableListComponent.output);
    this.Table.addPanelist(TableListComponent.output).subscribe(
      data=>{console.log("Successful");
      const PanelAdd = <HTMLElement>document.querySelector('.modaladded');  //alert for successful panelist addition
      PanelAdd.style.display='block'; 
      setTimeout(() => {
        PanelAdd.style.display='none'; 
      }, 3000);	
      }
    );
    e.target.elements[0].value=null;e.target.elements[1].value="";e.target.elements[2].value="";e.target.elements[3].value="";e.target.elements[4].value="";
   this.Panelists=[];
    this.sorts=[];
    this.sorts1=[];
    setTimeout(() => {
      this.Table.getPanelists().subscribe((data)=>
    {
      console.log(data);
        this.Panelists.push(data);
      this.ConvergeCat(this.sstorage.retrieve('category'));
      this.ConvergeRound(this.sstorage.retrieve('round'));
        this.Roundno=this.sstorage.retrieve('round');   
        this.Category1=this.sstorage.retrieve('category'); 
    });
    }, 3000);
    
    
  }

  Converge(){
    if(TableListComponent.cat==="All")
      for(let x of this.Panelists)
        this.sorts.push(x);
    else if(TableListComponent.cat==="CONSUMER")
      for(let x of this.Panelists){
        if(x['category']=="CONSUMER")
          this.sorts.push(x);
        }
    else if(TableListComponent.cat==="E-COMMERCE")
      for(let x of this.Panelists){
        if(x['category']=="E-COMMERCE")
          this.sorts.push(x);
      }
    else if(TableListComponent.cat==="TECHNOLOGY")
      for(let x of this.Panelists){
        if(x['category']=="TECHNOLOGY")
          this.sorts.push(x);
      }
      else if(TableListComponent.cat==="EDUCATION")
      for(let x of this.Panelists){
        if(x['category']=="EDUCATION")
          this.sorts.push(x);
      }
      else if(TableListComponent.cat==="HEALTHCARE")
      for(let x of this.Panelists){
        if(x['category']=="HEALTHCARE")
          this.sorts.push(x);
      }
      else if(TableListComponent.cat==="LOGISTICS")
      for(let x of this.Panelists){
        if(x['category']=="LOGISTICS")
          this.sorts.push(x);
      }
      else if(TableListComponent.cat==="MANUFACTURING")
      for(let x of this.Panelists){
        if(x['category']=="MANUFACTURING")
          this.sorts.push(x);
      }
      if(TableListComponent.rou==="All"){
        for(let x of this.sorts)
          this.sorts1.push(x);
      }
      if(TableListComponent.rou==="Round 1"){
        for(let x of this.sorts){
          if(x['round']==1){
            console.log(x["2"]);
            this.sorts1.push(x);
          }
        }
      }
      if(TableListComponent.rou==="Round 2"){
        for(let x of this.sorts){
          if(x['round']==2)
            this.sorts1.push(x);
        }
      }
  }
  ConvergeCat(e){

    this.sstorage.store('category',e);
   while(this.sorts1.length!=0){
    this.sorts1.pop();
   }
   while(this.sorts.length!=0){
    this.sorts.pop();
  }
    TableListComponent.cat=e;
    console.log(TableListComponent.cat);
    this.Converge();
  }

  ConvergeRound(e){
    this.sstorage.store('round',e);
    while(this.sorts1.length!=0){
      this.sorts1.pop();
    }
    while(this.sorts.length!=0){
      this.sorts.pop();
    }
      TableListComponent.rou=e;
      console.log(TableListComponent.rou);
      this.Converge();
  }
  delete(username:string)
  {
    if(confirm("Are you sure you want to delete panelist "+username + " ?"))
    {
      this.Table.deletePanelist(username).subscribe(
        data=>{console.log("Successful");
        const PanelDelete = <HTMLElement>document.querySelector('.modaldeleted');  //alert for successful panelist addition
        PanelDelete.style.display='block'; 
        setTimeout(() => {
          PanelDelete.style.display='none'; 
        }, 3000);	
        }
      );
      this.Panelists=[];
      this.sorts=[];
      this.sorts1=[];
      setTimeout(() => {
        this.Table.getPanelists().subscribe((data)=>
      {
        console.log(data);
          this.Panelists.push(data);
        this.ConvergeCat(this.sstorage.retrieve('category'));
        this.ConvergeRound(this.sstorage.retrieve('round'));
          this.Roundno=this.sstorage.retrieve('round');   
          this.Category1=this.sstorage.retrieve('category'); 
      });
      }, 3000);
    }  
  }
}
