import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LoginToggleService } from '../../login-toggle.service';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[UserService]
})
export class NavbarComponent implements OnInit {
	private listTitles: any[];
	location: Location;
	private toggleButton: any;
	private sidebarVisible: boolean;
	status="Logout";
	Logged:boolean=true;
	visible:boolean;
	constructor(private userService: UserService, location: Location,  private element: ElementRef, private logger: LoginToggleService, private router: Router) {
	  	this.location = location;
		this.sidebarVisible = false;
	}

	close() {
		this.visible = false;
	  }
	// Login(){
	// 	this.router.navigate(['../user-profile']);
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
	Login(uname:string,psw:string)
	{
	  this.userService.gettingUser(uname,psw).subscribe((data) => {
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
}
