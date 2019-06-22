import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { LoginToggleService } from '../login-toggle.service';
import { PlatformLocation } from '@angular/common';
import { UserService } from '../shared/service/user.service';
import { SessionStorageService } from 'ngx-webstorage';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[UserService,SessionStorageService]
})
export class AdminComponent implements OnInit {
  public now: Date = new Date();
  private static obj: any;
  private static output: string;
  time: Date;
  round1end:boolean=true;
  round2end:boolean=true;
  startreg:boolean=true;
  pendingData:any={};
  pendingObject=[];
  constructor(private Location:PlatformLocation,private Table: TableService, private router: Router, private logger: LoginToggleService,private userService: UserService,public sstorage:SessionStorageService) {
    Location.onPopState(() => {
      if(window.location.pathname!='/admin')
      {
        alert ("You need to log Out !");
        this.Location.forward();   
      }   
    });
    this.userService.getClock().subscribe(time => this.time = time);
    
   }
 Round1()
 {
  const ModalRound1 = <HTMLElement>document.querySelector('.modalround1');  //alert for successful panelist addition
  ModalRound1.style.display='block'; 
 }
 Round2()
 {
  const ModalRound2 = <HTMLElement>document.querySelector('.modalround2');  //alert for successful panelist addition
  ModalRound2.style.display='block'; 
 }
 StartReg()
 {
  const startregmodal = <HTMLElement>document.querySelector('.startregmodal');  //alert for successful panelist addition
  startregmodal.style.display='block';
 }
 close(){
  const ModalRound1 = <HTMLElement>document.querySelector('.modalround1');  //alert for successful panelist addition
  ModalRound1.style.display='none';
  const ModalRound2 = <HTMLElement>document.querySelector('.modalround2');  //alert for successful panelist addition
  ModalRound2.style.display='none'; 
  const StopRound2 = <HTMLElement>document.querySelector('.stopround2');  //alert for successful panelist addition
  StopRound2.style.display='none';
  const startregmodal = <HTMLElement>document.querySelector('.startregmodal');  //alert for successful panelist addition
  startregmodal.style.display='none';
 }
 roundstart1()
 {
   this.close();
   this.round1end=false;
  this.userService.sendRound1().subscribe((data)=>{
    
    console.log("successful");
  });
 }
 roundstart2()
 {
   this.close();
   console.log('start');
   this.userService.checkPendingWork().subscribe((data)=>{
    console.log('first pending');
      this.pendingData=data.json();
      if(this.pendingData.length==0)
      {
        console.log('null');
        this.userService.sendRound2().subscribe((data)=>{  
          console.log("successful");
        });
        this.userService.getRound().subscribe((data)=>{
          if(data['statusEndRound2']=='END')
          {
            this.round2end=false;
          }
        });
      }
      else{
        this.pendingObject=[];
        this.userService.getPendingWorkNames().subscribe((data)=>{
          this.pendingObject.push(data);
        });
        const StopRound2 = <HTMLElement>document.querySelector('.stopround2');  //alert for successful panelist addition
        StopRound2.style.display='block';
      }
   });
  
 }
 StartRegistration(){
   this.close();
  this.round1end=true;
  this.round2end=true;
   this.userService.startRegistration().subscribe((data)=>{

    console.log("successful");
  });

 }
  ngOnInit() {
       this.userService.getRound().subscribe((data)=>{
         if(data['statusEndRound1']=='END')
     {     
       console.log("in");
       this.round1end=false;
     }
     if(data['statusEndRound2']=='END')
     {
       this.round2end=false;
     }
         });
  }
  
 
}