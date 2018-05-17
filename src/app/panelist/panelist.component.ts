import { Component, OnInit } from '@angular/core';
import { startupForm } from '../shared/models/user.model';
import { UserService } from '../shared/service/user.service';
declare var $: any;
@Component({
  selector: 'app-panelist',
  templateUrl: './panelist.component.html',
  styleUrls: ['./panelist.component.css'],
  providers:[UserService]
})
export class PanelistComponent implements OnInit {
  exceeded:boolean=false;
  model;
  accepted:number;
  rejected:number;
  currentEvalID:number;
  count:number=0;
  currentevalStartup:startupForm=new startupForm();
  legalOption:string='select all';
  revenueOption:string='select all';
  workingOption:string='select all';
  legalOptions=['yes','no','select all'];
  flags=[false,false,false];
  
  /*currentevalStartup:{sid:number,startupName:string,startupIdea:string,description:string,rating:number,round:string,note:string}={
        sid:0,
        startupName:"default",
        startupIdea:"default",
        description:"default",
        rating:0,
        round:"default",
        note:""
  };*/
  startups:startupForm[]=[];      //this varies with filtration
  s1:startupForm=new startupForm();
  s2:startupForm=new startupForm();
  s3:startupForm=new startupForm();
  s4:startupForm=new startupForm();
  s5:startupForm=new startupForm();
  startupsCopy:startupForm[]=[];    //this remains the same as original copy ...doesnt change ever
  temp:startupForm[]=[];            //this is used to push forms that satisfy condition in loop
  moretemp:startupForm[]=[];

 /* startups:{sid:number,startupName:string,startupIdea:string,description:string,rating:number,round:string,note:string}[]=[
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

 // list=[];
  constructor(private userService:UserService) {

   /* this.userService.getList().subscribe((data)=>{
          this.list.push(data);
    });*/

    this.s1.sid=1;
    this.s1.primaryCustomer="adults in age gap 20-30";
    this.s1.painPoint="going to pay bills";
    this.s1.operationalRevenue="yes";
    this.s1.category="finance";
    this.s1.competitors="paytm";
    this.s1.legalEntity="yes";
    this.s1.workingIdea="no";
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
    this.s2.legalEntity="no";
    this.s2.workingIdea="no";
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
    this.s3.legalEntity="no";
    this.s3.workingIdea="yes";
    this.s3.description="New app that gives information regarding new government schemes.";
    this.s3.startupIdea="easy monthly pension retrieval.";
    this.s3.startupName="EaseRetirement3";
    this.startups.push(this.s3);

    this.s4.sid=4;
    this.s4.primaryCustomer="above 40 age group";
    this.s4.painPoint="going to pay bills";
    this.s4.operationalRevenue="no";
    this.s4.category="finance";
    this.s4.competitors="paytm";
    this.s4.legalEntity="yes";
    this.s4.workingIdea="yes";
    this.s4.description="New app that gives information regarding new government schemes.";
    this.s4.startupIdea="easy monthly pension retrieval.";
    this.s4.startupName="EaseRetirement4";
    this.startups.push(this.s4);

    this.s5.sid=5;
    this.s5.primaryCustomer="above 40 age group";
    this.s5.painPoint="going to pay bills";
    this.s5.operationalRevenue="yes";
    this.s5.category="finance";
    this.s5.competitors="paytm";
    this.s5.legalEntity="yes";
    this.s5.workingIdea="no";
    this.s5.description="New app that gives information regarding new government schemes.";
    this.s5.startupIdea="easy monthly pension retrieval.";
    this.s5.startupName="EaseRetirement5";
    this.startups.push(this.s5);
  
    this.startupsCopy=this.startups;

   }
   finalCheck()
   {
     // this.userService.postList(this.list).subscribe();   //posting data back to db

     console.log(this.startupsCopy);

     console.log("i got submitted");
   }
  onAcceptReject(sid:number,val:string)
  {
      console.log("hi");
      if(val==='yes')
      {
        for(let entry of this.startupsCopy)
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
        for(let entry of this.startupsCopy)
        {
          if(entry.sid===sid)
          {
              entry.round='no';
              break;
          }
        }
      }
    this.count=0;
    for(let entry of this.startupsCopy)
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
    this.userService.getFormDetails(this.currentEvalID).subscribe(

    );
    this.userService.getFormFounders(this.currentEvalID).subscribe(

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

  Legalising(current)
  {
    this.legalOption=current;
    switch(current)
    {
      case 'yes':this.flags[0]=true;break;
      case 'no':this.flags[0]=true;break;
      case 'select all':this.flags[0]=false;break;
    }
    this.finalFiltering(0);
  }
  Revenueing(current)
  {
    this.revenueOption=current;
    switch(current)
    {
      case 'yes':this.flags[1]=true;break;
      case 'no':this.flags[1]=true;break;
      case 'select all':this.flags[1]=false;break;
    }
    this.finalFiltering(1);
  }
  Working(current)
  {
    this.workingOption=current;
    switch(current)
    {
      case 'yes':this.flags[2]=true;break;
      case 'no':this.flags[2]=true;break;
      case 'select all':this.flags[2]=false;break;
    }
    this.finalFiltering(2);
  }
  finalFiltering(filter:number)
  {
    switch(filter)
    {
      case 0:
      {
          this.temp=[];
          for(let entry of this.startupsCopy)
          {
            if(entry.legalEntity===this.legalOption)
              this.temp.push(entry);
          }
          if(this.legalOption==='select all')
            this.temp=this.startupsCopy;

            
          if(this.flags[1]==false && this.flags[2]==false)
          {
             this.startups=this.temp;
          }
          else if(this.flags[1]==true && this.flags[2]==false)
          {
              this.moretemp=[];
              for(let entry of this.temp)
              {
                if(entry.operationalRevenue===this.revenueOption)
                {
                  this.moretemp.push(entry);
                }     
              }
              this.startups=this.moretemp;
          }
          else if(this.flags[1]==false && this.flags[2]==true)
          {
              this.moretemp=[];
              for(let entry of this.temp)
              {
                if(entry.workingIdea===this.workingOption)
                {
                  this.moretemp.push(entry);
                }     
              }
              this.startups=this.moretemp;
          }
          else
          {
            this.moretemp=[];
            for(let entry of this.temp)
            {
              if(entry.workingIdea===this.workingOption && entry.operationalRevenue===this.revenueOption)
              {
                this.moretemp.push(entry);
              }     
            }
            this.startups=this.moretemp;
          }
          break;
      }
      case 1:
      {

          this.temp=[];
          for(let entry of this.startupsCopy)
          {
            if(entry.operationalRevenue===this.revenueOption)
              this.temp.push(entry);
          }
          if(this.revenueOption==='select all')
            this.temp=this.startupsCopy;


          if(this.flags[0]==false && this.flags[2]==false)
          {
             this.startups=this.temp;
          }
          else if(this.flags[0]==true && this.flags[2]==false)
          {
              this.moretemp=[];
              for(let entry of this.temp)
              {
                if(entry.legalEntity===this.legalOption)
                {
                  this.moretemp.push(entry);
                }     
              }
              this.startups=this.moretemp;
          }
          else if(this.flags[0]==false && this.flags[2]==true)
          {
              this.moretemp=[];
              for(let entry of this.temp)
              {
                if(entry.workingIdea===this.workingOption)
                {
                  this.moretemp.push(entry);
                }     
              }
              this.startups=this.moretemp;
          }
          else
          {
            this.moretemp=[];
            for(let entry of this.temp)
            {
              if(entry.workingIdea===this.workingOption && entry.legalEntity===this.legalOption)
              {
                this.moretemp.push(entry);
              }     
            }
            this.startups=this.moretemp;
          }
          break;
      }
      case 2:
      {

          this.temp=[];
          for(let entry of this.startupsCopy)
          {
            if(entry.workingIdea===this.workingOption)
              this.temp.push(entry);
          }
          if(this.workingOption==='select all')
            this.temp=this.startupsCopy;


          if(this.flags[0]==false && this.flags[1]==false)
          {
             this.startups=this.temp;
          }
          else if(this.flags[0]==true && this.flags[1]==false)
          {
              this.moretemp=[];
              for(let entry of this.temp)
              {
                if(entry.legalEntity===this.legalOption)
                {
                  this.moretemp.push(entry);
                }     
              }
              this.startups=this.moretemp;
          }
          else if(this.flags[0]==false && this.flags[1]==true)
          {
              this.moretemp=[];
              for(let entry of this.temp)
              {
                if(entry.operationalRevenue===this.revenueOption)
                {
                  this.moretemp.push(entry);
                }     
              }
              this.startups=this.moretemp;
          }
          else
          {
            this.moretemp=[];
            for(let entry of this.temp)
            {
              if(entry.legalEntity===this.legalOption && entry.operationalRevenue===this.revenueOption)
              {
                this.moretemp.push(entry);
              }     
            }
            this.startups=this.moretemp;
          }
          break;
      }
    }
  }
  temp1:string;
  temp2:string;
  temp3:string;
  rejecting()
  {
    console.log("rejecting");
    for(let entry of this.startups)
    {
        if(this.flags[0]===false)
        {
          this.temp1=entry.legalEntity;
          entry.legalEntity='select all';
        }
        
        if(this.flags[1]===false)
        {
          this.temp2=entry.operationalRevenue;
          entry.operationalRevenue='select all';
        }
        if(this.flags[2]===false)
        {
          this.temp3=entry.workingIdea;
          entry.workingIdea='select all';
        }                      
      if(entry.legalEntity===this.legalOption && entry.operationalRevenue===this.revenueOption && entry.workingIdea===this.workingOption)
      {
        entry.round='no';
        this.onAcceptReject(entry.sid,'no');
      }
      
      
      if(this.flags[0]===false)entry.legalEntity=this.temp1;
      if(this.flags[1]===false)entry.operationalRevenue=this.temp2;
      if(this.flags[2]===false)entry.workingIdea=this.temp3;
      
    }
    console.log(this.startups);
  }

  ngOnDestroy()
  {
    console.log("destroyed");
  }

}