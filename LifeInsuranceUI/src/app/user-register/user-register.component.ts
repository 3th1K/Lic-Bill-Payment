import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../models/custom-validators';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {


  userRegistrationForm=new FormGroup({
    'FirstName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'LastName': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Email': new FormControl('',[Validators.required, Validators.email]),
    'Gender': new FormControl('',[Validators.required]),
    'PhoneNumber': new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
    'Password': new FormControl('', [Validators.required]),
  });

  constructor(private _sharedService: SharedService, private _router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.userRegistrationForm.valid){
      this._sharedService.registerUser(this.userRegistrationForm.value).subscribe(()=>{
        console.log("created");
        this.userRegistrationForm.reset();
        this._router.navigate(['/user-login']);
      });
    }
    else{
      console.log("not created");
      alert("Something Went Worng");
      this._router.navigate(['/home']);
    }
  }

}
