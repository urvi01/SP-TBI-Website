import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';


declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SessionStorageService]
})
export class AppComponent implements OnInit,OnChanges {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    abc:boolean;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    private eventsSubject: Subject<boolean> = new Subject<boolean>();
    constructor( public location: Location, private router: Router,public sstorage:SessionStorageService) {}

    ngOnChanges(){
       
    }
    ngOnInit() {
        console.log('app');
        if(this.sstorage.retrieve('username'))
        {
           this.hide(false);
        }
        else{
           this.hide(true);
        }
        $.material.init();
      /*  const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
         this.router.events.subscribe((event:any) => {
            this.navbar.sidebarClose();
            if (event instanceof NavigationStart) {
               if (event.url != this.lastPoppedUrl)
                   this.yScrollStack.push(window.scrollY);
           } else if (event instanceof NavigationEnd) {
               if (event.url == this.lastPoppedUrl) {
                   this.lastPoppedUrl = undefined;
                   window.scrollTo(0, this.yScrollStack.pop());
               } else
                   window.scrollTo(0, 0);
           }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
             elemMainPanel.scrollTop = 0;
             elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }*/
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    isMaps(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
            return false;
        }
        else {
            return true;
        }
    }
    hide(log:boolean)
    {
        this.abc=log;
        if(log==false)
        {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            elemMainPanel.style.width='100%';    
        }
        else{
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            if (window.matchMedia(`(min-width: 991px)`).matches){
                elemMainPanel.style.width='calc(100% - 260px)';
            }
            else
            {
                elemMainPanel.style.width='100%';
            }
           
        }
    }
    hideSidebar(log:boolean)
    {
        if(log==false)
        {
            console.log("bla");
            this.eventsSubject.next(true) ;  
        }
    }
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const ps = new PerfectScrollbar(elemMainPanel);
        ps.update();
      }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
