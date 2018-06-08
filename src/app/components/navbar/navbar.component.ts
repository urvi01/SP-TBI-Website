import { Component, OnInit, ElementRef, Input,NgModule, ViewChild } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LoginToggleService } from '../../login-toggle.service';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[UserService,SessionStorageService]
})
export class NavbarComponent implements OnInit {
    @ViewChild('uname') uname:ElementRef;
    @ViewChild('psw') psw:ElementRef;
    @Input()uname1:string;
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    status="Logout";
    Logged:boolean=true;
    visible:boolean;
    constructor(private userService: UserService, location: Location,  private element: ElementRef, private logger: LoginToggleService, private router: Router, private sstorage:SessionStorageService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    close() {
        this.visible = false;
      }
    // Login(){
    //  this.router.navigate(['../user-profile']);
    // }
    Dash(){
        this.router.navigate(['../dashboard']);
    }

    ngOnInit(){
       
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.logger.newSubject.subscribe(
            status => {this.Logged=!status;}
        );
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.status=LoginToggleService.status;
        if(this.sstorage.retrieve('logged'))
        {
            this.Logged=false;
        }
        this.adminValidated();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
        }
        titlee = titlee.split('/').pop();

        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    adminValidated(){
        this.logger.admin();
    }

    LoggedOut(){
        this.Logged=false;
    }
    Login(event:Event)
    {
        event.preventDefault();
        if(!this.sstorage.retrieve('username'))
        {
            this.sstorage.store('username',this.uname.nativeElement.value);
        }
        
      this.userService.gettingUser(this.uname.nativeElement.value,this.psw.nativeElement.value).subscribe((data) => {
          this.userService.userName=data['username'];
          this.userService.userType=data['check'];
          this.userService.category=data['category'];
            
            this.sstorage.store('logged','false');
            console.log('Urvi is asshole ');
            console.log(this.userService.userName);
            do
            {
				
                if(this.userService.userType===1) //user is panelist
            {
				this.sstorage.store('username',this.userService.userName);	
              this.logger.loginSuccessful();
              this.logger.sendSignal(true);
              this.router.navigate(['panelist']);
            }
            else if(this.userService.userType===2)  //user is panelist
            {
				this.sstorage.store('username',this.userService.userName);
              this.logger.loginSuccessful();
              this.logger.sendSignal(true);
              this.router.navigate(['panelist']);
            }
            else if(this.userService.userType===3) //user is admin
            {
				this.sstorage.store('username',this.userService.userName);
              this.logger.loginSuccessful();
              this.logger.sendSignal(true);
              this.router.navigate(['addpanelist']);
            }
            else if(this.userService.userType!=0)
            {
                alert('wrong username or password');
                break;
               // this.router.navigate(['dashboard']);
            }
            }while(this.userService.userType==0);
          
      });
      
    }
    logout(){
        this.sstorage.clear('logged');
        this.sstorage.clear('startupsBeforeReject');
        this.sstorage.clear('startupsCopy');
        this.sstorage.clear('startups');
        this.sstorage.clear('count');
        this.sstorage.clear('legal');
        this.sstorage.clear('work');
        this.sstorage.clear('revenue');
        this.sstorage.clear('checkbox');
        this.sstorage.clear('limit');
        this.sstorage.clear('userName');
        this.Logged=true;
        this.router.navigate(['dashboard']);
    }
    
}