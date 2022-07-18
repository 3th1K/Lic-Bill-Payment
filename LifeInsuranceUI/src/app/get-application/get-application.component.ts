import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeApplication } from '../models/employee-application';
import { Employee } from '../models/employee';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-get-application',
  templateUrl: './get-application.component.html',
  styleUrls: ['./get-application.component.css']
})
export class GetApplicationComponent implements OnInit {
 
  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router:Router) { }

  role = this._sharedService.getTokenData()['Role'];
  application: EmployeeApplication = new EmployeeApplication();
  id: any;
  dataLoaded:boolean = false;
  isAccepted:boolean = false;
  employee: Employee = new Employee();

  passwordForm = new FormGroup({ 
    'password' : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }

    this._route.queryParamMap.subscribe(params=>{
      this.id = params.get('id');
      this.initializeApplication();
    });
  }

  initializeApplication(){
    this.dataLoaded = false;
    this._sharedService.adminGetApplication(this.id).subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.application = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("Application Not Found");
        this._router.navigate(['get-applications']);
      }
    });
  }

  acceptApplication(){
    this.employee.FirstName = this.application.FirstName;
    this.employee.LastName = this.application.LastName;
    this.employee.Email = this.application.Email;
    this.employee.Gender = this.application.Gender;
    this.employee.PhoneNumber = this.application.PhoneNumber;
    this.employee.DateOfBirth = this.application.DateOfBirth;
    this.employee.MartialStatus = this.application.MartialStatus;
    this.employee.AadharNumber = this.application.AadharNumber;
    this.employee.Address = this.application.Address;
    if(this.passwordForm.valid){
      this.employee.Password = this.passwordForm.value.password!;
      console.log(this.employee);
      this._sharedService.adminAddEmployee(this.employee).subscribe({
        next: (data:any)=>{
          console.log(data);
          alert("Employee Added Successfully");
          this._sharedService.adminDeleteApplication(this.application.Id).subscribe();
          this._router.navigate(['get-applications']);
        },
        error: (err:HttpErrorResponse)=>{
          alert("OOPS, Something Went Wrong!");
          this._router.navigate(['get-applications']);
        }
      })
    }
    else{
      alert("Please input a password to proceed");
    }
  }

  rejectApplication(){
    this._sharedService.adminDeleteApplication(this.application.Id).subscribe(()=>{
      this._router.navigate(['get-applications'])
      alert("Application Rejected");
    })
  }

}
