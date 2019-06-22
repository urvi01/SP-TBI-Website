import { Component, OnInit, ElementRef, Input,NgModule, ViewChild, Output, EventEmitter } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Home',  icon: 'dashboard', class: '' },
  //  { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
   // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
   // { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: 'registration', title: 'Registration',  icon:'library_books', class: '' },
   // { path: 'panelist', title: 'Panelist',  icon:'library_books', class: ''},
    //{ path: 'login', title: 'Login',  icon:'library_books', class: ''},
    //{ path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //{ path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  @Output()loginFromSide=new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  hideSidebar()
  {
    document.getElementById('login').style.display='block';
      console.log("blabla");
      this.loginFromSide.emit(false);
  }
}
