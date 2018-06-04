import { Component, OnInit,HostListener, Input, EventEmitter, Output } from '@angular/core';
import { LoginToggleService } from '../login-toggle.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from '../shared/service/user.service';
import { FormBuilder, NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class UserProfileComponent implements OnInit {
  
  constructor(private logger: LoginToggleService, private router: Router,private userService:UserService, private fb : FormBuilder) { }
  LoginAttempt(e){
    if(e.target.elements[0].value==="admin" && e.target.elements[1].value==="admin"){
      this.logger.loginSuccessful();
      this.logger.sendSignal(true);
     
      this.router.navigate(['./addpanelist']); 
      
    }
  }
  /*LoginAttempt(e){
    if(e.target.elements[0].value==="admin" && e.target.elements[1].value==="admin"){
      this.logger.loginSuccessful();
      this.logger.sendSignal(true);
     
      this.router.navigate(['./addpanelist']); 
      
    }
  }*/
  Login(f:NgForm)
  {
    this.userService.gettingUser(f.value.uname,f.value.pass).subscribe((data) => {
        this.userService.userName=data['username'];
        this.userService.userType=data['check'];
        this.userService.category=data['category'];
        
    });
    if(this.userService.userType===1) //user is panelist
    {
      this.logger.loginSuccessful();
      this.logger.sendSignal(true);
      this.router.navigate(['panelist']);
    }
    else if(this.userService.userType===2)  //user is panelist
    {
      this.logger.loginSuccessful();
      this.logger.sendSignal(true);
      this.router.navigate(['panelist']);
    }
    else if(this.userService.userType===3) //user is admin
    {
      this.logger.loginSuccessful();
      this.logger.sendSignal(true);
      this.router.navigate(['addpanelist']);
    }
    else
    {
        alert('wrong username or password');
       // this.router.navigate(['dashboard']);
    }
  }
  ngOnInit() {
  }


}
