import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserDetails } from '../models/user-details';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  constructor(private _sharedService:SharedService, private _router:Router) { }

  userId = this._sharedService.getTokenData()['Id'];
  role =  this._sharedService.getTokenData()['Role'];
  dataLoaded: boolean = false;

  user: User = new User();
  userDetails: UserDetails = new UserDetails();

  ngOnInit(): void {
    if(this.role!="user"){
      alert("You are not Authorized !");
      this._router.navigate(['user-login']);
    }

    this.GetUser();
    this.GetUserDetails();


  }

  GetUser(){
    this._sharedService.userGetUser(this.userId).subscribe(data=>{      
      this.user = data;
    });
  }

  GetUserDetails(){
    this._sharedService.userGetUserDetails(this.userId).subscribe({
      next: (data:any) => { 
        this.dataLoaded = true;      
        this.userDetails = data;
        console.log(this.userDetails.Policy.Cost);
        if(!this.userDetails.PolicyId && this.userDetails.TenureOfPolicy<=0){
          alert("You Cant Access This Page before Selecting Policy and Tenure !");
          this._router.navigate(['user-dashboard']);
        }
      },
      error: (err:HttpErrorResponse) => {
        alert('Something Went Wrong');
        this._router.navigate(['user-dashboard']);
      }
    });
  }

}
