import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {

  constructor(private _sharedService: SharedService) { }

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
    this._sharedService.getUsers().subscribe((data)=>{
      if(data)
        this.dataLoaded = true;
      this.users = data;
    });
  }

}
