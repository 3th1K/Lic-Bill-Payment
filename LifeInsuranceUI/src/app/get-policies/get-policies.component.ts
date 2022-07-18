import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Policy } from '../models/policy';

@Component({
  selector: 'app-get-policies',
  templateUrl: './get-policies.component.html',
  styleUrls: ['./get-policies.component.css']
})
export class GetPoliciesComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _router: Router) { }

  policies: Policy[] = [];
  dataLoaded:boolean = false;
  role = this._sharedService.getTokenData()['Role'];

  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }
    this.initializePolicies();
  }

  removePolicy(id:number){
    this._sharedService.adminDeletePolicy(id).subscribe(data =>{this.initializePolicies(); console.log(data)});
  }
  
  initializePolicies(){
    this.dataLoaded = false;
    this._sharedService.adminGetPolicies().subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.policies = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("OOPS, Something Went Wrong!");
        this._router.navigate(['admin-dashboard']);
      }
    });
  }

}
 