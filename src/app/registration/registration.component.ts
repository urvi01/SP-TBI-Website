import { Component, OnInit, Input } from '@angular/core';
import {Ng2PaginationModule} from 'ng2-pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import {startupForm} from '../shared/models/user.model';
import {Founder} from '../shared/models/founder.model';
import {UserService} from '../shared/service/user.service';
import { FormsModule,FormBuilder, Validators,FormGroup,FormControl, NgForm} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[UserService,FormBuilder,FormsModule,SessionStorageService]
})
export class RegistrationComponent implements OnInit {
  namename:string="";
  F1:{founderName:string,founderEmail:string,founderContact:number}={founderName:"",founderEmail:"",founderContact:0};
  F2:{founderName:string,founderEmail:string,founderContact:number}={founderName:"",founderEmail:"",founderContact:0};
  F3:{founderName:string,founderEmail:string,founderContact:number}={founderName:"",founderEmail:"",founderContact:0};
  F4:{founderName:string,founderEmail:string,founderContact:number}={founderName:"",founderEmail:"",founderContact:0};
  F5:{founderName:string,founderEmail:string,founderContact:number}={founderName:"",founderEmail:"",founderContact:0};
  F6:{founderName:string,founderEmail:string,founderContact:number}={founderName:"",founderEmail:"",founderContact:0};
  FounderList:any[]=[];
  maximumFounders:number[]=[1,2,3,4,5,6];
  categories:string[]=['Consumer','E-Commerce','Education','Healthcare','Logistics','Manufacturing','Technology','Others'];
  selectedCategory='';
  selectedFounder = 1;
  legalEntity:string="";
  workingModel:string="";
  operationalRevenue:string="";
  u:startupForm;
  revenue:boolean=true;
  work:boolean=true;
  legal:boolean=true;
  success:boolean=false;
  f1:boolean=true;f2:boolean=false;f3:boolean=false;f4:boolean=false;f5:boolean=false;f6:boolean=false;
  reg_open:boolean=true;
  count:number;
  constructor(private  userService: UserService,private router:Router, private fb : FormBuilder,public sstorage:SessionStorageService) {
    
   }

  ngOnInit() {
    this.count=0;
    this.userService.getRound().subscribe((data)=>{
      if(data['statusEndRound1']=='END')
        this.reg_open=false;
    });
  }
  namechange(current)
  {
      this.namename=current;  
  }

  login(f:NgForm)
  {
    this.u=new startupForm();
    this.F1.founderName=f.value.founder1name;
    this.F1.founderContact=parseInt(f.value.founder1contact,10);
    this.F1.founderEmail=f.value.founder1email;
    this.FounderList.push(this.F1);
    if(this.selectedFounder>=2)
    {
      this.F2.founderName=f.value.founder2name;
      this.F2.founderContact=f.value.founder2contact;
      this.F2.founderEmail=f.value.founder2email;
      this.FounderList.push(this.F2);
    }
    if(this.selectedFounder>=3)
    {
      this.F3.founderName=f.value.founder3name;
      this.F3.founderContact=f.value.founder3contact;
      this.F3.founderEmail=f.value.founder3email;
      this.FounderList.push(this.F3);
    }
    if(this.selectedFounder>=4)
    {
      this.F4.founderName=f.value.founder4name;
      this.F4.founderContact=f.value.founder4contact;
      this.F4.founderEmail=f.value.founder4email;
      this.FounderList.push(this.F4);
    }
    if(this.selectedFounder>=5)
    {
      this.F5.founderName=f.value.founder5name;
      this.F5.founderContact=f.value.founder5contact;
      this.F5.founderEmail=f.value.founder5email;
      this.FounderList.push(this.F5);
    }
    if(this.selectedFounder>=6)
    {
      this.F6.founderName=f.value.founder6name;
      this.F6.founderContact=f.value.founder6contact;
      this.F6.founderEmail=f.value.founder6email;
      this.FounderList.push(this.F6);
    }

    
    this.u.startupName=f.value.name;
    this.u.startupIdea=f.value.idea;
    this.u.category=this.selectedCategory;
    this.u.legalEntity=this.legalEntity;
    this.u.noFounders=this.selectedFounder;
    this.u.founders=this.FounderList;
    this.u.description=f.value.company;
    this.u.painPoint=f.value.pain;
    this.u.primaryCustomer=f.value.customer;
    this.u.competitors=f.value.competitors;
    this.u.differentFromCompetitors=f.value.difference;
    this.u.moneyModel=f.value.monetization;
    this.u.workingIdea=this.workingModel;
    this.u.operationalRevenue=this.operationalRevenue;
    console.log(this.u);
    this.userService.verName(this.namename).subscribe((data)=>{
      if(data['check']=='YES')
      {
        if(alert("The Startup Name already exists."))
        {
          console.log('Duplicate startup name');
          this.namename="";
        }      
      }
      else
      {
        this.userService.submitRegistration(this.u).subscribe(
          startupForm => {
            console.log("successful");	
            const Popup = <HTMLElement>document.querySelector('.modalsuccess');
            Popup.style.display='block'; 
            console.log(this.success);
            setTimeout(() => {
              Popup.style.display='none'; 
              this.router.navigate(['dashboard']);
            }, 3000);				   
          }
        ); 
      }
    });
    //INITIALISING THE STARTUPFORM U VARIABLE


    /*  this.userService.getUserByname(f.value.uname).subscribe(
        (data:User)=> {this.u=data;
      //  if(this.u.password===f.value.pass)
        {
          console.log(this.u);
          console.log('true');
          this.router.navigate(['/dashboard']);
          
        }
    //  else
      {
        console.log('false');
        alert("Incorrect password");
      }
        }
      );*/
  }

  submitForm(value: any){
    console.log(value);
  }

  onSelectCategory(current)
  {
    this.selectedCategory=current;
  }

  onChange(current)
  {
      this.f1=false;this.f2=false;this.f3=false;this.f4=false;this.f5=false;this.f6=false;
      console.log(current);
      this.selectedFounder = current;

      if(this.selectedFounder==1)
          this.f1=true;
      else if(this.selectedFounder == 2)
      {
        this.f1=true;
        this.f2=true;
      }
      else if(this.selectedFounder==3)
      {
        this.f1=true;
        this.f2=true;
        this.f3=true;
      }
      else if(this.selectedFounder==4)
      {
        this.f1=true;
        this.f2=true;
        this.f3=true;
        this.f4=true;
      }
      else if(this.selectedFounder==5)
      {
        this.f1=true;
        this.f2=true;
        this.f3=true;
        this.f4=true;
        this.f5=true;
      }
      else
      {
        this.f1=true;
        this.f2=true;
        this.f3=true;
        this.f4=true;
        this.f5=true;
        this.f6=true;
      }
     /* var  i:number;
      this.selected=[];
        for(i=1;i<=this.selectedFounder;i++)
        {
          this.selected.push(i);
        }
        console.log(this.selected);
        this.chosenOne=this.selected;*/
    } 

    onLegalChange(legal) {
      this.legal=false;
      this.legalEntity=legal;
      console.log(legal);
   }
   onWorkingChange(work) {
     this.work=false;
     this.workingModel=work;
    console.log(work);
 }
 onRevenueChange(revenue) {
   this.revenue=false;
   this.operationalRevenue=revenue;  
}
}
  
/*
changePass(f:NgForm)
  {
    console.log(f);
    this.userService.getUserByname(f.value.unameforgot).subscribe(
      (data:User)=> {this.u=data;
     //   this.u.password=f.value.passforgot;
        this.userService.changePass(this.u).subscribe(
          (data:User)=> {this.u=data;});
          this.forgot=false;
    });
   
  }

  forgotpass()
  {
    this.forgot=true;
  }
  
  changePath()
  {

  }
    complexForm : FormGroup;
  this.complexForm = fb.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      'idea' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'legal':  [null, Validators.required],
      'company' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'pain' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'customer' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'competitors' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'difference' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'monetization' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'money' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'working':  [null, Validators.required],
      'revenue':  [null, Validators.required]
    })
*/