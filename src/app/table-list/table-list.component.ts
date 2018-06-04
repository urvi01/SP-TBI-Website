import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  private static category: string;
  private static round: string;
  private static startups: number;
  private static id: string;
  private static password: string;
  private Panelists: Array<[string, string, string, string, number]>=[];
  private sorts: Array<[string, string, string, string, number]>=[];
  private sorts1: Array<[string, string, string, string, number]>=[];
  private static cat: string;
  private static rou :string;  
  constructor(private Table: TableService, private router: Router) {
    
  }


  ngOnInit() {
    for(let x of TableService.Panelists)
    {
      var temp=JSON.parse(x);
      TableListComponent.category=temp.Category;
      TableListComponent.id=temp.ID;
      TableListComponent.round=temp.Round;
      TableListComponent.startups=temp.Startups;
      TableListComponent.password=temp.Password;
      this.Panelists.push([TableListComponent.id,TableListComponent.password,TableListComponent.round,TableListComponent.category,TableListComponent.startups]);
    }
    
  }

  Converge(){
    if(TableListComponent.cat==="All")
      for(let x of this.Panelists)
        this.sorts.push(x);
    else if(TableListComponent.cat==="Finance")
      for(let x of this.Panelists){
        if(x["3"]=="Finance")
          this.sorts.push(x);
        }
    else if(TableListComponent.cat==="Marketing")
      for(let x of this.Panelists){
        if(x["3"]=="Marketing")
          this.sorts.push(x);
      }
    else if(TableListComponent.cat==="Tech")
      for(let x of this.Panelists){
        if(x["3"]=="Tech")
          this.sorts.push(x);
      }
      if(TableListComponent.rou==="All"){
        for(let x of this.sorts)
          this.sorts1.push(x);
      }
      if(TableListComponent.rou==="Round 1"){
        for(let x of this.sorts){
          if(x["2"]=="Round1"){
            console.log(x["2"]);
            this.sorts1.push(x);
          }
        }
      }
      if(TableListComponent.rou==="Round 2"){
        for(let x of this.sorts){
          if(x["2"]=="Round2")
            this.sorts1.push(x);
        }
      }
  }
  ConvergeCat(e){

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
  route1(){
      this.router.navigate(['/addpanelist']);
  }
  route2(){
    this.router.navigate(['/table-list']);
  }
  route3(){
    this.router.navigate(['/forms']);
  }
}
