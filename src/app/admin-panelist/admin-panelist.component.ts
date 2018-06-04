import { Component, OnInit ,Input} from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TableService } from '../table.service';
import { LoginToggleService } from '../login-toggle.service';
declare var $: any;
@Component({
  selector: 'app-admin-panelist',
  templateUrl: './admin-panelist.component.html',
  styleUrls: ['./admin-panelist.component.css']
})
export class AdminPanelistComponent implements OnInit {

  private static Round1: boolean;
  private static Round2: boolean;
  private static Round: string = "None";
  private static obj: any;
  private static output: string;
  private static test:any;
  constructor(private Table: TableService, private router: Router, private logger: LoginToggleService) { }
  ngOnInit() {
     AdminPanelistComponent.Round1=true;
     AdminPanelistComponent.Round2=false;
  }
  Round1active(){
    if(AdminPanelistComponent.Round1==false){
      AdminPanelistComponent.Round1=true;
      AdminPanelistComponent.Round2=false;
      console.log("Round 1 activated");
    }
  }
  Round2active(){
    if(AdminPanelistComponent.Round2==false){
      AdminPanelistComponent.Round2=true;
      AdminPanelistComponent.Round1=false;
      console.log("Round 2 activated");
    }
  }

  
  MakeObject(e){
    if(e.target.elements[2].value === "" || e.target.elements[3].value === "" || e.target.elements[4].value === "" || e.target.elements[5].value === ""){
      alert("Some Fields are missing");
      return;
    }
    if(AdminPanelistComponent.Round1)
      AdminPanelistComponent.Round="Round1";
    else if(AdminPanelistComponent.Round2)
      AdminPanelistComponent.Round="Round2";
    AdminPanelistComponent.obj=JSON.stringify({"Round":AdminPanelistComponent.Round,"ID":e.target.elements[2].value, "Password":e.target.elements[3].value,"Startups":e.target.elements[4].value,"Category":e.target.elements[5].value});
    AdminPanelistComponent.output=AdminPanelistComponent.obj;
    console.log(AdminPanelistComponent.output);
    this.Table.addToList(AdminPanelistComponent.output);
    this.Table.addPanelist(AdminPanelistComponent.output).subscribe(
      string=>{console.log("Successful");
      }
    );
  }

  DeletePanelist(e){
    if(AdminPanelistComponent.Round1)
      AdminPanelistComponent.Round="Round1";
    else if(AdminPanelistComponent.Round2)
      AdminPanelistComponent.Round="Round2";
    if(e.target.elements[2].value === "" || e.target.elements[3].value === ""){
      alert("Some Fields are missing");
      return;
    }
      AdminPanelistComponent.obj=JSON.stringify({"Round":AdminPanelistComponent.Round,"ID":e.target.elements[2].value,"Category":e.target.elements[3].value});
      AdminPanelistComponent.output=AdminPanelistComponent.obj;
      //console.log(AdminPanelistComponent.output);
      this.Table.delFromList(AdminPanelistComponent.output);
      this.Table.deletePanelist(AdminPanelistComponent.output).subscribe(
        string=>{console.log("Successful");
        }
      );
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


 
  
  


