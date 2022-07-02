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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

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
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
