import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _authService:AuthenticationService, private _router:Router) { }
  isLoggedIn:boolean = this._authService.loggedIn();

  ngOnInit(): void {
  }

  doLogout(){
    this._authService.logout();
    this._router.navigate(['home']);
  }

}
