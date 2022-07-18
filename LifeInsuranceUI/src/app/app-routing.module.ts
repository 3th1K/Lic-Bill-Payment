import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GetUserComponent } from './get-user/get-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GetEmployeesComponent } from './get-employees/get-employees.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ApplyEmployeeComponent } from './apply-employee/apply-employee.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { FinalPageComponent } from './final-page/final-page.component';
import { GetEmployeeComponent } from './get-employee/get-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { GetApplicationsComponent } from './get-applications/get-applications.component';
import { GetApplicationComponent } from './get-application/get-application.component';
import { GetPoliciesComponent } from './get-policies/get-policies.component';
import { GetPolicyComponent } from './get-policy/get-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home', component:HomeComponent},
  {path:'about-us', component:AboutUsComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'user-register', component:UserRegisterComponent},
  {path:'user-login', component:UserLoginComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {path:'employee-login', component:EmployeeLoginComponent},
  {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[AuthGuard]},
  {path:'user-dashboard', component:UserDashboardComponent, canActivate:[AuthGuard]},
  {path:'employee-dashboard', component:EmployeeDashboardComponent, canActivate:[AuthGuard]},
  {path:'apply-employee', component:ApplyEmployeeComponent},
  {path:'payment-page', component:PaymentPageComponent, canActivate:[AuthGuard]},
  {path:'final-page', component:FinalPageComponent},
  {path:'get-users', component:GetUsersComponent, canActivate:[AuthGuard]},
  {path:'get-user', component:GetUserComponent, canActivate:[AuthGuard]},
  {path:'edit-user', component:EditUserComponent, canActivate:[AuthGuard]},
  {path:'get-employee', component:GetEmployeeComponent, canActivate:[AuthGuard]},
  {path:'get-employees', component:GetEmployeesComponent, canActivate:[AuthGuard]},
  {path:'edit-employee', component:EditEmployeeComponent, canActivate:[AuthGuard]},
  {path:'get-applications', component:GetApplicationsComponent, canActivate:[AuthGuard]},
  {path:'get-application', component:GetApplicationComponent, canActivate:[AuthGuard]},
  {path:'get-policies', component:GetPoliciesComponent, canActivate:[AuthGuard]},
  {path:'get-policy', component:GetPolicyComponent, canActivate:[AuthGuard]},
  {path:'edit-policy', component:EditPolicyComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
