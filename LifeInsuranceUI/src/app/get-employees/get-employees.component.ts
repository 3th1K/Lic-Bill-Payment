import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-employees',
  templateUrl: './get-employees.component.html',
  styleUrls: ['./get-employees.component.css']
})
export class GetEmployeesComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _router: Router) { }

  employees:Employee[] = [];
  dataLoaded:boolean = false;
  role = this._sharedService.getTokenData()['Role'];
  
  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }
    this.initializeEmployees();
  }

  removeEmployee(id:number){
    this._sharedService.adminDeleteEmployee(id).subscribe(data =>{this.initializeEmployees(); console.log(data)});
  }
  
  initializeEmployees(){
    this.dataLoaded = false;
    this._sharedService.adminGetEmployees().subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.employees = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("OOPS, Something Went Wrong!");
        this._router.navigate(['admin-dashboard']);
      }
    });
  }

}
