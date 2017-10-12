import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth/auth.service';
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { AdminUserCrudService } from './services/admin-user-crud/admin-user-crud.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { GuestGuard } from './guards/guest.guard';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel/admin-panel.component';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import { GlobalMetricsComponent } from './components/admin/admin-panel/global-metrics/global-metrics.component';
import { UsersInfoPanelComponent } from './components/admin/admin-panel/users-info-panel/users-info-panel.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent, canActivate:[GuestGuard]},
  {path:'login', component: LoginComponent, canActivate:[GuestGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'admin/login', component: AdminLoginComponent},
  {path:'admin/panel', component: AdminPanelComponent, canActivate: [AdminGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    LoadingSpinnerComponent,
    GlobalMetricsComponent,
    UsersInfoPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, 
    AuthService, 
    AdminAuthService, 
    AdminUserCrudService,
    AuthGuard, 
    AdminGuard, 
    GuestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
