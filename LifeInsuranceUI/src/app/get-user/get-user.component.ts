import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';



@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  constructor() { }
  user:any;
  ngOnInit(): void {
  }

}
