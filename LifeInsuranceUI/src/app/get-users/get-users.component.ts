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
  
  ngOnInit(): void {
    this.initializeUsers();
  }

  removeUser(id:number){
    this._sharedService.deleteUser(id).subscribe(()=>{this.initializeUsers();});
    
  }
  
  initializeUsers(){
    this.dataLoaded = false;
    this._sharedService.getUsers().subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.users = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("You are not Authorized !");
        this._router.navigate(['admin-login']);
      }
    });
  }

}
