import { Component, OnInit, ElementRef, Input,NgModule, ViewChild, Output, EventEmitter, HostListener, Renderer2 } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LoginToggleService } from '../../login-toggle.service';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
// import '../../../assets/js/car.js';
// declare var myExtObjectNew: any;
//declare const $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[UserService,SessionStorageService]
})
export class NavbarComponent implements OnInit {
    private eventsSubscription: any;
    @Input() events: Observable<boolean>;
    @ViewChild('uname') uname:ElementRef;
    @ViewChild('psw') psw:ElementRef;
    @Output()hideSide=new EventEmitter<boolean>();
    @Input()uname1:string;
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    status="Logout";
    Logged:boolean=true;
    visible:boolean;
    admin:boolean=true;
    panelname:string;
    constructor(private renderer: Renderer2,private userService: UserService, location: Location,  private element: ElementRef, private logger: LoginToggleService, private router: Router, private sstorage:SessionStorageService) {
        this.location = location;
        this.sidebarVisible = false;
    }
   

    close() {
        this.visible = false;
      }
    // Login(){
    //  this.router.navigate(['../user-profile']);
    // }
    // @HostListener('window:scroll', ['$event']) 
    // scrollHandler(event) {
    //   console.debug("Scroll Event");
    //   $(window).scroll(function() {
    //     var text = $(".text");
    //     var scroll = $(window).scrollTop();
    
    //     if (scroll >= 2) {
    //       console.log("hello");
    //         text.removeClass("hidden");
    //     } else {
    //       console.log("heloo else");
    //         text.addClass("hidden");
    //     }
    //     });
    // }
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
        if(this.sstorage.retrieve('usertype'))
        {
            this.panelname=this.sstorage.retrieve('username');
            this.admin=false;
        }
        this.adminValidated();
        this.eventsSubscription = this.events.subscribe((data) => {
            this.sidebarClose();
            const body = document.getElementsByTagName('body')[0];
            body.style.overflow='hidden';
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        elemMainPanel.style.height='200%';
        });
    }
    closeModal(){
        document.getElementById('login').style.display='none';
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow='auto';
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        elemMainPanel.style.height='100%';
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
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        elemMainPanel.style.height='100%';
    };
    sidebarToggle() {
        const toggleButton = this.toggleButton;
         const body = document.getElementsByTagName('body')[0];
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
            do
            {
				
                if(this.userService.userType===1) //user is panelist
            {
                this.panelname=this.userService.userName;
                this.admin=false;
                this.sstorage.store('username',this.userService.userName);
                this.sstorage.store('usertype','false');	
              this.logger.loginSuccessful();
              this.logger.sendSignal(true);
              this.hideSide.emit(false);
              this.router.navigate(['panelist']);
            }
            else if(this.userService.userType===2)  //user is panelist
            {
                this.panelname=this.userService.userName;
                this.admin=false;
                this.sstorage.store('username',this.userService.userName);
                this.sstorage.store('usertype','false');
              this.logger.loginSuccessful();
              this.logger.sendSignal(true);
              this.hideSide.emit(false);
              this.router.navigate(['panelist']);
            }
            else if(this.userService.userType===3) //user is admin
            {
                this.sstorage.store('username',this.userService.userName);
                this.admin=true;
              this.logger.loginSuccessful();
              this.logger.sendSignal(true);
              this.hideSide.emit(false);
              this.router.navigate(['admin']);
              
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
    Dash()
    {
        if(this.sstorage.retrieve('username'))
        {
                this.logout();       
        } 
        else{
            this.router.navigate(['dashboard']);
        }   
    }
    logout(){
        if(confirm('Are you sure you want to Log Out ?\n\nPress Submit button to save changes otherwise they will be lost !!')){
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
        this.sstorage.clear('username');
        this.sstorage.clear('usertype');
        this.Logged=true;
        this.hideSide.emit(true);
        this.router.navigate(['dashboard']);
        }
        
    }
    
}