import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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

import { GetEmployeeComponent } from './get-employee/get-employee.component';
import { GetEmployeesComponent } from './get-employees/get-employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

import { GetUsersComponent } from './get-users/get-users.component';
import { GetUserComponent } from './get-user/get-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GetPoliciesComponent } from './get-policies/get-policies.component';
import { GetPolicyComponent } from './get-policy/get-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';

import { JwtModule } from '@auth0/angular-jwt';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ApplyEmployeeComponent } from './apply-employee/apply-employee.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { FinalPageComponent } from './final-page/final-page.component';
import { GetApplicationsComponent } from './get-applications/get-applications.component';
import { GetApplicationComponent } from './get-application/get-application.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';

export function tokenGetter(){
  return localStorage.getItem("token");
}

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
    GetEmployeeComponent,
    GetEmployeesComponent,
    EditEmployeeComponent,
    GetUsersComponent,
    GetUserComponent,
    EditUserComponent,
    GetPoliciesComponent,
    GetPolicyComponent,
    EditPolicyComponent,
    UserDashboardComponent,
    EmployeeDashboardComponent,
    ApplyEmployeeComponent,
    PaymentPageComponent,
    FinalPageComponent,
    GetApplicationsComponent,
    GetApplicationComponent,
    EmployeeLoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthenticationService, SharedService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
