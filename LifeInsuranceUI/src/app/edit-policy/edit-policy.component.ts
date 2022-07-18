import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Policy } from '../models/policy';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router:Router) { }

  id:any;
  role = this._sharedService.getTokenData()['Role'];
  policy: Policy = new Policy();

  policyUpdationForm = new FormGroup({
    'Id': new FormControl(''),
    'Name': new FormControl('',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(30)]),
    'Description': new FormControl('',[Validators.required, Validators.maxLength(100)]),
    'Cost': new FormControl('',[Validators.required]),
    'PolicyType': new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }

    this._route.queryParams.subscribe(data => {
      this.id=data['id'];
      if(this.id)
        this.GetPolicy();

    })
  }

  GetPolicy(){
    this._sharedService.adminGetPolicy(this.id).subscribe(data=>{ 
          
      this.policy = data;
      this.policyUpdationForm.patchValue({
        Id: data.Id,
        Name : data.Name,
        Description : data.Description,
        Cost : data.Cost,
        PolicyType : data.PolicyType
      });
    });
  }

  onUpdatePolicy(){
    if(this.policyUpdationForm.valid){
      this._sharedService.adminUpdatePolicy(this.policyUpdationForm.value).subscribe((data)=>{
        console.log(data);
        alert("Policy Details Updated");
        this.GetPolicy();
        this._router.navigate(['get-policies']);
      });
    }
  }

  onAddPolicy(){
    if(this.policyUpdationForm.valid){
      const p = {
                  Name: this.policyUpdationForm.value.Name,
                  Description: this.policyUpdationForm.value.Description,
                  Cost : this.policyUpdationForm.value.Cost,
                  PolicyType : this.policyUpdationForm.value.PolicyType
                }
      this._sharedService.adminAddPolicy(p).subscribe((data)=>{
        console.log(data);
        alert("Policy Added");
        this._router.navigate(['get-policies']);
      });
    }
  }

}
 