import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { SharedService } from './services/shared.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
<<<<<<< HEAD
import { GetEmployeeComponent } from './get-employee/get-employee.component';
import { GetEmployeesComponent } from './get-employees/get-employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
=======
import { GetUsersComponent } from './get-users/get-users.component';
import { GetUserComponent } from './get-user/get-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
>>>>>>> 2f348934920af70026f7bda595e5de714e5852ce

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    UserRegisterComponent,
    UserLoginComponent,
    FooterComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
<<<<<<< HEAD
    GetEmployeeComponent,
    GetEmployeesComponent,
    EditEmployeeComponent
=======
    GetUsersComponent,
    GetUserComponent,
    EditUserComponent
>>>>>>> 2f348934920af70026f7bda595e5de714e5852ce
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, SharedService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
