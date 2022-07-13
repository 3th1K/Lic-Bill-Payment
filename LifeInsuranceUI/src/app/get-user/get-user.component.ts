import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { SharedService } from '../services/shared.service';



@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute) { }
  user: User = new User();
  id: any;
  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params=>{
      this.id = params.get('id');
      this.initializeUser();
      console.log(this.user.Id);
    });
  }

  initializeUser(){
    this._sharedService.getUser(this.id).subscribe(data=>{
      this.user = data;
    });
  }

}
