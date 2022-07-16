import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id:any; 
  alertMsg:any;

  employeeForm=new FormGroup({
    'FirstName': new FormControl<string|null>(null,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'LastName': new FormControl<string|null>(null,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Email': new FormControl<string|null>(null,[Validators.email]),
    'Gender': new FormControl<string|null>(null,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'PhoneNumber': new FormControl<number|null>(null,[Validators.required, Validators.pattern("[0-9]{10}")]),
    'DateOfBirth': new FormControl<string|null>(null, [Validators.required]),
    'MartialStatus': new FormControl<boolean>(false),
    'AadharNumber': new FormControl<string|null>(null,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(12)]),
    'Address': new FormControl<string|null>(null,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Password':new FormControl<string|null>(null, [Validators.required])
  });

  constructor(private _sharedService:SharedService, private _route:ActivatedRoute, private _router:Router) { 
  }
  

  ngOnInit(): void {
    this.id = this._route.snapshot.queryParamMap.get('id');
    if(this.id!=null){
      this._sharedService.adminGetEmployee(this.id).subscribe((res)=>{
        this.employeeForm.patchValue({
          FirstName: res.FirstName,
          LastName: res.LastName,
          Email: res.Email,
          Gender: res.Gender,
          PhoneNumber: res.PhoneNumber,
          DateOfBirth: res.DateOfBirth,
          MartialStatus: res.MartialStatus,
          AadharNumber: res.AadharNumber,
          Address: res.Address
        })
      });
    }
  }

  createEmployee(){
    if(this.employeeForm.valid){
      this._sharedService.createEmployee(this.employeeForm.value).subscribe(()=>{
        console.log("created");
        this.employeeForm.reset();
        this._router.navigate(['/get-employees']);
      });
    }
    else{
      console.log("not created");
    }
  }

  editemployee(){
    if(this.employeeForm.valid){
      this._sharedService.updateEmployee(this.id, this.employeeForm.value).subscribe(()=>{
        console.log("created");
        this.employeeForm.reset();
        this._router.navigateByUrl('/get-employee?id='+this.id);
      });
    }
    else{
      console.log("invalid data");
    }
  }

}
