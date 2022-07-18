import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-employee',
  templateUrl: './apply-employee.component.html',
  styleUrls: ['./apply-employee.component.css']
})
export class ApplyEmployeeComponent implements OnInit {

  employeeApplicationForm=new FormGroup({
    'FirstName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'LastName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Email': new FormControl('',[Validators.required, Validators.email]),
    'Gender': new FormControl('',[Validators.required]),
    'PhoneNumber': new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
    'DateOfBirth': new FormControl('',[Validators.required]),
    'MartialStatus': new FormControl('',[Validators.required]),
    'AadharNumber': new FormControl('',[Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    'Address': new FormControl('',[Validators.required]),
    'CurrentOccupation': new FormControl('',[Validators.required]),
    'JobRole': new FormControl('',[Validators.required]),
    'Cgpa_X': new FormControl('',[Validators.required]),
    'Cgpa_XII': new FormControl('',[Validators.required]),
    'CollegeCourse': new FormControl('',[Validators.required]),
    'Cgpa_College': new FormControl('',[Validators.required]),
  });

  constructor(private _sharedService: SharedService, private _router:Router) { }

  ngOnInit(): void {
  }

  applying: boolean = false;
  apply(){
    if(this.employeeApplicationForm.valid){
      this.applying = true;
      console.log("submitted")
      console.log(this.employeeApplicationForm.value)
      this._sharedService.employeeApply(this.employeeApplicationForm.value).subscribe(()=>{
        this.applying = false;
        console.log("created");
        this.employeeApplicationForm.reset();
        alert("Application Sent");
        this._router.navigate(['/home']);
      });
    }
    else{
      console.log("not created");
    }
  }

}
