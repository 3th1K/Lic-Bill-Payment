import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _router: Router) { }

  users:User[] = [];
  dataLoaded:boolean = false;
  role = this._sharedService.getTokenData()['Role'];
  
  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }
    this.initializeUsers();
  }

  removeUser(id:number){
    this._sharedService.adminDeleteUser(id).subscribe(data =>{this.initializeUsers(); console.log(data)});
  }
  
  initializeUsers(){
    this.dataLoaded = false;
    this._sharedService.adminGetUsers().subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.users = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("OOPS, Something Went Wrong!");
        this._router.navigate(['admin-dashboard']);
      }
    });
  }

}
