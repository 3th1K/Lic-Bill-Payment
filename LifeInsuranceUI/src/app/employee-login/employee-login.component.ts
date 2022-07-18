import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  constructor(private _authService:AuthenticationService, private _router:Router, private _s:SharedService) { }

  employeeLoginForm = new FormGroup({
    EmailAddress : new FormControl('', [Validators.required, Validators.email]),
    Password : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }
  logginIn:boolean=false;
  doLogin(){
    if(this.employeeLoginForm.valid){
      this.logginIn = true;
      this._authService.employeeLogin(this.employeeLoginForm.value).subscribe({
        next : (res:any) => {
          this.logginIn = false;
          localStorage.setItem('token', res.token);
          this._router.navigate(['employee-dashboard']);
          console.log(this._s.getTokenData());
        },
          error: (err:HttpErrorResponse) => {
            this.logginIn = false;
            console.log(err);
            alert("Please Enter Valid Credentials");
            this.employeeLoginForm.controls.Password.setValue('');
            this._router.navigate(['employee-login']);
        }
      });
    }
  }
 
}
