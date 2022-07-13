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
import { UserRegisterComponent } from './user-register/user-register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GetEmployeesComponent } from './get-employees/get-employees.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home', component:HomeComponent},
  {path:'about-us', component:AboutUsComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'user-register', component:UserRegisterComponent},
  {path:'user-login', component:UserLoginComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[AuthGuard]},
  {path:'get-users', component:GetUsersComponent, canActivate:[AuthGuard]},
  {path:'get-user', component:GetUserComponent, canActivate:[AuthGuard]},
  {path:'edit-user', component:EditUserComponent, canActivate:[AuthGuard]},
  {path:'get-employees', component:GetEmployeesComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
