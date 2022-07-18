import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
 
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id:any;
  role = this._sharedService.getTokenData()['Role'];
  employee:Employee = new Employee();

  employeeUpdationForm = new FormGroup({
    'Id': new FormControl(''),
    'FirstName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'LastName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Email': new FormControl('',[Validators.required, Validators.email]),
    'Gender': new FormControl('',[Validators.required]),
    'PhoneNumber': new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
    'DateOfBirth': new FormControl('',[Validators.required]),
    'MartialStatus': new FormControl('',[Validators.required]),
    'AadharNumber': new FormControl('',[Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    'Address': new FormControl('',[Validators.required])
  });

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router:Router) { 
  }
  

  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }

    this._route.queryParams.subscribe(data => {
      this.id=data['id'];
      this.GetEmployee();
    })
  }

  GetEmployee(){
    this._sharedService.adminGetEmployee(this.id).subscribe(data=>{      
      this.employee = data;
      this.employeeUpdationForm.patchValue({
        Id : data.Id,
        FirstName : data.FirstName,
        LastName : data.LastName,
        Email : data.Email,
        Gender : data.Gender,
        PhoneNumber : data.PhoneNumber,
        DateOfBirth : data.DateOfBirth,
        MartialStatus: data.MartialStatus,
        AadharNumber: data.AadharNumber,
        Address: data.Address
      });
      
    });
  }

  onUpdateEmployee(){
    if(this.employeeUpdationForm.valid){
      this._sharedService.adminUpdateEmployee(this.employeeUpdationForm.value).subscribe((data)=>{
        alert("Employee Details Updated");
        this.GetEmployee();
        this._router.navigate(['get-employee'], {queryParams:{id:this.id}});
      });
    }
  }

}
