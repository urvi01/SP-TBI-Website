import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {Ng2Webstorage} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-modialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';

import { AuthGuard } from './auth.guard';
import { LoginToggleService } from './login-toggle.service';
import { TableService } from './table.service';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { RegistrationComponent } from './registration/registration.component';
import { PanelistComponent } from './panelist/panelist.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelistComponent } from './admin-panelist/admin-panelist.component';
import { FormsComponent } from './forms/forms.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    RegistrationComponent,
    PanelistComponent,
    LoginComponent,
    AdminPanelistComponent,
    FormsComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    Ng2PaginationModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [LoginToggleService, TableService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
