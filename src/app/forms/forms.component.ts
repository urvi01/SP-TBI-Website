import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { LoginToggleService } from '../login-toggle.service';
import { startupForm } from '../shared/models/user.model';




@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers:[TableService, LoginToggleService]
})
export class FormsComponent implements OnInit {
  exceeded:boolean=false;
  model;
  accepted:number;
  rejected:number;
  currentEvalID:number;
  count:number=0;
  currentevalStartup:startupForm=new startupForm();
  
  /*currentevalStartup:{sid:number,startupName:string,startupIdea:string,description:string,rating:number,round:string,note:string}={
        sid:0,
        startupName:"default",
        startupIdea:"default",
        description:"default",
        rating:0,
        round:"default",
        note:""
  };*/
  startups:startupForm[]=[];
  s1:startupForm=new startupForm();
  s2:startupForm=new startupForm();
  s3:startupForm=new startupForm();
  s4:startupForm=new startupForm();
  /*
  startups:{sid:number,startupName:string,startupIdea:string,description:string,rating:number,round:string,note:string}[]=[
    {
        sid:5,
        startupName:"abc",
        startupIdea:"abc",
        description:"abc",
        rating:0,
        round:"default",
        note:""
    },

    {
      sid:6,
      startupName:"cde",
      startupIdea:"cde",
      description:"cde",
      rating:0,
      round:"default",
      note:""
    },
    {
      sid:7,
      startupName:"def",
      startupIdea:"def",
      description:"def",
      rating:0,
      round:"default",
      note:""
    }
  ];*/
  constructor(private logger:LoginToggleService, private router: Router, private Table: TableService) {
    this.s1.sid=1;
    this.s1.primaryCustomer="adults in age gap 20-30";
    this.s1.painPoint="going to pay bills";
    this.s1.operationalRevenue="yes";
    this.s1.category="finance";
    this.s1.competitors="paytm";
    this.s1.description="New app to pay online bills not just electricity but also household .";
    this.s1.startupIdea="Ease in payment of bills.";
    this.s1.startupName="ForALL";
    this.startups.push(this.s1);

    this.s2.sid=2;
    this.s2.primaryCustomer="sports people";
    this.s2.painPoint="going to pay bills";
    this.s2.operationalRevenue="no";
    this.s2.category="finance";
    this.s2.competitors="paytm";
    this.s2.description="Compares all th rates of nearby sprts shops.";
    this.s2.startupIdea="getting sports equipments of good quality at cheaper rates.";
    this.s2.startupName="Kidz";
    this.startups.push(this.s2);

    this.s3.sid=3;
    this.s3.primaryCustomer="above 40 age group";
    this.s3.painPoint="going to pay bills";
    this.s3.operationalRevenue="yes";
    this.s3.category="finance";
    this.s3.competitors="paytm";
    this.s3.description="New app that gives information regarding new government schemes.";
    this.s3.startupIdea="easy monthly pension retrieval.";
    this.s3.startupName="EaseRetirement";
    this.startups.push(this.s3);
  
   }
   finalCheck()
   {
     console.log(this.startups);
     console.log("i got submitted");
   }
  onAcceptReject(sid:number,val:string)
  {
      if(val==='yes')
      {
        for(let entry of this.startups)
        {
          if(entry.sid===sid)
          {
              entry.round='yes';
              break;
          }
        }
      }
      else
      {
        for(let entry of this.startups)
        {
          if(entry.sid===sid)
          {
              entry.round='no';
              break;
          }
        }
      }
    this.count=0;
    for(let entry of this.startups)
    {
       if(entry.round==='yes')
          this.count++;
    }
    if(this.count>2)
    {
      this.exceeded=true;
    }
    else
    {
      this.exceeded=false;
    }
  }
  goToForm(startupID:number)
  { 
    console.log(this.count);
    console.log(startupID);
    let x = document.querySelector("#form");
    if (x){
        x.scrollIntoView();
    }
    this.currentEvalID=startupID;
    this.Table.getFormDetails(this.currentEvalID).subscribe(

    );
    this.Table.getFormFounders(this.currentEvalID).subscribe(

    );
    
    for(let entry of this.startups)
    {
      if(entry.sid===startupID)
      {
          this.currentevalStartup=entry;
          break;
      }
    }
  }
  goToTop(formList:string)
  {
    console.log("gototop");
    let x = document.querySelector("#"+formList);
    if (x){
        x.scrollIntoView();
    }
  }
  ngOnInit() {
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
