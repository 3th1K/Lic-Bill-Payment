import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _authService:AuthenticationService, private _router:Router) { }

  ngOnInit(): void {
    this._authService.adminDashboard().subscribe({
      next : (res:any) => console.log(res),
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("You are not Authorized !");
        this._router.navigate(['admin-login']);
      }
    })
  }

} 
