import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { startupForm } from '../shared/models/user.model';
import { UserService } from '../shared/service/user.service';
import {SessionStorageService, SessionStorage} from 'ngx-webstorage';
import { Jsonp } from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-panelist',
  templateUrl: './panelist.component.html',
  styleUrls: ['./panelist.component.css'],
  providers:[UserService,SessionStorageService]
})
export class PanelistComponent implements OnInit,OnChanges,OnDestroy {

  ngOnChanges() {
    console.log("onchanges");
  }
  @Input()legal1:string;
  @Input()revenue1:string;
  @Input()work1:string;
  @Input()reject1:boolean;
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
  temp1:string; //for legal,working,revenue options temporary 
  temp2:string;
  temp3:string;
      
  startups=[];      //this varies with filtration
  startupsCopy=[];  //this remains the same as original copy ...doesnt change ever
  temp=[];            //this is used to push forms that satisfy condition in loop
  moretemp=[];
  startupsBeforeReject:string;  //maintains a copy before reject
  startupsWhileReject=[];
  
  constructor(private userService:UserService, private sstorage:SessionStorageService) {
    console.log("constructor");
    if(!sstorage.retrieve('startups'))
    {
      this.userService.getList().subscribe((data)=>{
            this.startups.push(data);
      });
      this.startupsCopy=this.startups;
    }
   }

   ngOnInit()
   {
    console.log("ngoninit");
    if(this.sstorage.retrieve('checkbox')=='true')
    {
      this.reject1=true;
    }
    if(this.sstorage.retrieve('startups'))
    {
      this.startups=JSON.parse(this.sstorage.retrieve('startups'));
    }
    if(this.sstorage.retrieve('startupsCopy'))
    {
      this.startupsCopy=JSON.parse(this.sstorage.retrieve('startupsCopy'));
    }
    if(this.sstorage.retrieve('count'))
    {
      this.count=JSON.parse(this.sstorage.retrieve('count'));
    }
    if(this.sstorage.retrieve('legal'))
    {
      this.legalOption=this.sstorage.retrieve('legal');
      this.legal1=this.sstorage.retrieve('legal');
    }
    if(this.sstorage.retrieve('revenue'))
    {
      this.revenueOption=this.sstorage.retrieve('revenue');
      this.revenue1=this.sstorage.retrieve('revenue');
    }
    if(this.sstorage.retrieve('work'))
    {
      this.workingOption=this.sstorage.retrieve('work');
      this.work1=this.sstorage.retrieve('work');
    }
    if(this.sstorage.retrieve('formopened'))
    {
      console.log(this.sstorage.retrieve('formopened'));
      this.goToForm(this.sstorage.retrieve('formopened'));
    }
   }
  
   finalCheck()
   {
     // this.userService.postList(this.list).subscribe();   //posting data back to db
     console.log(this.startups);
     console.log("i got submitted");
     this.sessionStoring();
   }
  onAcceptReject(sid:number,val:string)
  {
      console.log("onAcceptReject");
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
      this.keepCount();
    }

  keepCount()   //keeps count of forms that can be selected
  {
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
    this.sessionStoring();
  }

  goToForm(startupID:number)    //opens the form the panelist clicks on 
  {
    
    console.log(startupID);
    let x = document.querySelector("#form");
    if (x){
        x.scrollIntoView();
    }
    this.currentEvalID=startupID;
    // this.userService.getFormDetails(this.currentEvalID).subscribe(

    // );
    // this.userService.getFormFounders(this.currentEvalID).subscribe(

    // );
    
    for(let entry of this.startups)
    {
      if(entry.sid==startupID)
      {
          this.currentevalStartup=entry;
          break;
      }
    }
  }
  goToTop(formList:string)  //goes back to entire list of all forms
  {
    console.log("gototop");
    let x = document.querySelector("#"+formList);
    if (x){
        x.scrollIntoView();
    }
  }

  Legalising(current)
  {
    console.log("legalising");
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
    console.log("revenueing");
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
    console.log("working");
    console.log(this.startups);
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
    console.log("finalfiltering");
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
    this.sessionStoring();
  }
  rejectingAll(current)
  {
    console.log(current);
    if(current===true)
    {
      this.sstorage.store('checkbox','true');
      this.startupsBeforeReject=JSON.stringify(this.startupsCopy);
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
    }
    if(current===false)
    {
      if(this.sstorage.retrieve('startupsBeforeReject'))
      {
        this.startupsBeforeReject=this.sstorage.retrieve('startupsBeforeReject');
      }
      this.sstorage.store('checkbox','false');
      this.startupsCopy=JSON.parse(this.startupsBeforeReject);
      this.startups=JSON.parse(this.startupsBeforeReject);
      this.finalFiltering(0);this.finalFiltering(1);this.finalFiltering(2);
      this.startupsBeforeReject='';
    }
   
    this.keepCount();
    this.sessionStoring();
  }
  
  sessionStoring()
  {
    this.sstorage.store('startupsBeforeReject',this.startupsBeforeReject);
    this.sstorage.store('startupsCopy',JSON.stringify(this.startupsCopy)); 
    this.sstorage.store('startups',JSON.stringify(this.startups));
    this.sstorage.store('count',JSON.stringify(this.count));
    this.sstorage.store('legal',this.legalOption);
    this.sstorage.store('work',this.workingOption);
    this.sstorage.store('revenue',this.revenueOption);
  }

  ngOnDestroy()
  {
    console.log("destroyed");
    this.sessionStoring();
  }

}