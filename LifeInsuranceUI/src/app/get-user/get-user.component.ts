import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from '../models/user-details';



@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router:Router) { }
  role = this._sharedService.getTokenData()['Role'];
  user: User = new User();
  userDetails: UserDetails = new UserDetails();
  id: any;
  dataLoaded:boolean = false;

 
  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }

    this._route.queryParamMap.subscribe(params=>{
      this.id = params.get('id');
      this.initializeUser();
      this.initializeUserDetails();
      console.log(this.user.Id);
    });
  }

  initializeUser(){
    this.dataLoaded = false;
    this._sharedService.adminGetUser(this.id).subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.user = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("User Not Found");
        this._router.navigate(['get-users']);
      }
    });
  }

  initializeUserDetails(){
    this._sharedService.adminGetUserDetails(this.id).subscribe({
      next : (data:any)=>{
        this.userDetails = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log("no user details for this user");
      }
    });
  }

}
