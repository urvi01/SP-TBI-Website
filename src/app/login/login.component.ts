import { Component, OnInit, Input,Output,EventEmitter, 
    trigger, state, style, animate, transition } from '@angular/core';
import {Ng2PaginationModule} from 'ng2-pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import {startupForm} from '../shared/models/user.model';
import {Founder} from '../shared/models/founder.model';
import {UserService} from '../shared/service/user.service';
import { FormsModule,FormBuilder, Validators,FormGroup,FormControl, NgForm} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  
    providers: [UserService,FormBuilder,FormsModule]
})
export class LoginComponent implements OnInit {
    

    user=[];
    constructor(private userService:UserService,private router:Router, private fb : FormBuilder)
    {

    }
    ngOnInit(){
        
    }
    
    Login(f:NgForm)
  {
    this.userService.gettingUser(f.value.uname,f.value.pass).subscribe((data) => {
        this.userService.userName=data['username'];
        this.userService.userType=data['check'];
        this.userService.category=data['category'];
        
    });

    if(this.userService.userType===1)
    {
        this.router.navigate(['addpanelist']);
    }
    else if(this.userService.userType===2)
    {
        this.router.navigate(['addpanelist']);
    }else if(this.userService.userType===3)
    {
        this.router.navigate(['registration']);
    }
    else if(this.userService.userType===4)
    {
        this.router.navigate(['dashboard']);
    }
  }
//   window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     };
//     }
}
