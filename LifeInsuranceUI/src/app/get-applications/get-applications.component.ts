import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeApplication } from '../models/employee-application';

@Component({
  selector: 'app-get-applications',
  templateUrl: './get-applications.component.html',
  styleUrls: ['./get-applications.component.css']
})
export class GetApplicationsComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _router: Router) { }

  applications:EmployeeApplication[] = [];
  dataLoaded:boolean = false;
  role = this._sharedService.getTokenData()['Role'];

  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }
    this.initializeApplications();
  }

  removeApplication(id:number){
    this._sharedService.adminDeleteApplication(id).subscribe(data =>{this.initializeApplications(); console.log(data)});
  }
  
  initializeApplications(){
    this.dataLoaded = false;
    this._sharedService.adminGetApplications().subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.applications = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("OOPS, Something Went Wrong!");
        this._router.navigate(['get-users']);
      }
    });
  }

}
 