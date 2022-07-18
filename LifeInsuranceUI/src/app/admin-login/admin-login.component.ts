import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css', '../../styles.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private _authService:AuthenticationService, private _router:Router) { }

  adminLoginForm = new FormGroup({
    EmailAddress : new FormControl('', [Validators.required, Validators.email]),
    Password : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }
  logginIn:boolean=false;
  doLogin(){
    if(this.adminLoginForm.valid){
      this.logginIn = true;
      this._authService.adminLogin(this.adminLoginForm.value).subscribe({
        next : (res:any) => {
          this.logginIn = false;
          console.log(res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['admin-dashboard']);
        },
          error: (err:HttpErrorResponse) => {
            this.logginIn = false;
            console.log(err);
            alert("Please Enter Valid Credentials");
            this._router.navigate(['admin-login']);
        }
      });
    }
  }
 
} 
