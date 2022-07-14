import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private _authService:AuthenticationService, private _router:Router, private _s:SharedService) { }

  userLoginForm = new FormGroup({
    EmailAddress : new FormControl('', [Validators.required, Validators.email]),
    Password : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  doLogin(){
    this._authService.userLogin(this.userLoginForm.value).subscribe({
      next : (res:any) => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['user-dashboard']);
        console.log(this._s.getTokenData());
      },
        error: (err:HttpErrorResponse) => {
          console.log(err);
          alert("Please Enter Valid Credentials");
          this.userLoginForm.controls.Password.setValue('');
          this._router.navigate(['user-login']);
      }
    });
  }

}
