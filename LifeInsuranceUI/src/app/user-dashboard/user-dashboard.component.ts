import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserDetails } from '../models/user-details';
import { Policy } from '../models/policy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private _sharedService:SharedService, 
              private _authService:AuthenticationService,
              private _router:Router
              ) { }

  user: User = new User();
  policies: Policy[] = [];
  userDetails: UserDetails = new UserDetails();
  td = this._sharedService.getTokenData();

  userUpdationForm = new FormGroup({
    'Id': new FormControl(''),
    'FirstName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'LastName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Email': new FormControl('',[Validators.required, Validators.email]),
    'Gender': new FormControl('',[Validators.required]),
    'PhoneNumber': new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")])
  });
  userDetailsUpdationForm = new FormGroup({
    'DateOfBirth': new FormControl(''),
    'MartialStatus': new FormControl(''),
    'Occupation': new FormControl('',[Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Salary': new FormControl('',),
    'AadharNumber': new FormControl('',[Validators.pattern("[0-9]{12}")]),
    'PanNumber': new FormControl(''),
    'StreetAddressLine1': new FormControl(''),
    'StreetAddressLine2': new FormControl(''),
    'City': new FormControl(''),
    'State': new FormControl(''),
    'ZipCode': new FormControl(''),
    'TenureOfPolicy': new FormControl('',[Validators.required]),
    'UserId': new FormControl(''),
    'PolicyId': new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    if(this.td['Role']=="user"){

      this.GetUser();

      this.GetUserDetails();

      this._sharedService.userGetPolicies().subscribe(data => {this.policies = data});

    }
    else{
      alert("You are not Authorized !");
      this._router.navigate(['user-login']);
    }
  }

  GetUser(){
    this._sharedService.userGetUser(this.td['Id']).subscribe(data=>{      
      this.user = data;
      this.userUpdationForm.patchValue({
        Id: data.Id,
        FirstName : data.FirstName,
        LastName : data.LastName,
        Email : data.Email,
        Gender : data.Gender,
        PhoneNumber : data.PhoneNumber,
      });
      
    });
  }

  GetUserDetails(){
    this._sharedService.userGetUserDetails(this.td['Id']).subscribe({
      next: (data:any) => {       
        this.userDetails = data;
        console.log(this.userDetails);
        this.userDetailsUpdationForm.patchValue({
          DateOfBirth: data.DateOfBirth,
          MartialStatus: data.MartialStatus,
          Occupation: data.Occupation,
          Salary: data.Salary,
          AadharNumber: data.AadharNumber,
          PanNumber: data.PanNumber,
          StreetAddressLine1: data.StreetAddressLine1,
          StreetAddressLine2: data.StreetAddressLine2,
          City: data.City,
          State: data.State,
          ZipCode: data.ZipCode,
          TenureOfPolicy: data.TenureOfPolicy,
          UserId: this.td['Id'],
          PolicyId: data.PolicyId
        });
      },
      error: (err:HttpErrorResponse) => {
        this.userDetailsUpdationForm.patchValue({
          UserId: this.td['Id']
        });
      }
    });
  }

  onUpdateUserDetails(){
    if(this.userDetailsUpdationForm.valid){
      console.log(this.userDetailsUpdationForm.value)
      this._sharedService.userUpdateUserDetails(this.userDetailsUpdationForm.value).subscribe((data)=>{
        alert("User Details Updated");
        this.GetUserDetails();
        //this._router.navigateByUrl('/home');
      });
    }
  }
  onUpdateUser(){
    if(this.userUpdationForm.valid){
      this._sharedService.userUpdateUser(this.userUpdationForm.value).subscribe((data)=>{
        alert("User Details Updated");
        this.GetUser();
        //this._router.navigateByUrl('#list-viewprofile');
      });
    }
  }
 
}
