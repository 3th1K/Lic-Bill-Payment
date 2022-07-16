import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Policy } from '../models/policy';
import { UserDetails } from '../models/user-details';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router:Router) { }
  id:any;
  role = this._sharedService.getTokenData()['Role'];
  user: User = new User();
  policies: Policy[] = [];
  userDetails: UserDetails = new UserDetails();


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
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }

    this._route.queryParams.subscribe(data => {
      this.id=data['id'];

      this.GetUser();

      this.GetUserDetails();

      this._sharedService.adminGetPolicies().subscribe(data => {this.policies = data});
    })
  }

  GetUser(){
    console.log(this.id);
    this._sharedService.adminGetUser(this.id).subscribe(data=>{      
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
    this._sharedService.adminGetUserDetails(this.id).subscribe({
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
          UserId: this.id,
          PolicyId: data.PolicyId
        });
      },
      error: (err:HttpErrorResponse) => {
        this.userDetailsUpdationForm.patchValue({
          UserId: this.id
        });
      }
    });
  }

  onUpdateUserDetails(){
    if(this.userDetailsUpdationForm.valid){
      console.log(this.userDetailsUpdationForm.value)
      this._sharedService.adminUpdateUserDetails(this.userDetailsUpdationForm.value).subscribe((data)=>{
        alert("User Details Updated");
        this.GetUserDetails();
        this._router.navigate(['get-user'], {queryParams:{id:this.id}});
      });
    }
  }
  onUpdateUser(){
    if(this.userUpdationForm.valid){
      this._sharedService.adminUpdateUser(this.userUpdationForm.value).subscribe((data)=>{
        alert("User Details Updated");
        this.GetUser();
        this._router.navigate(['get-user'], {queryParams:{id:this.id}});
      });
    }
  }

}
