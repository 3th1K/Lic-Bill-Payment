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

  constructor(private _sharedService:SharedService, private _router:Router) { }
  employees:Employee[] = [];
  dataLoaded:boolean = false;
  
  ngOnInit(): void {
    this.initializeEmployees();
  }

  removeEmployee(id:number){
    this._sharedService.deleteEmployee(id).subscribe(data=>{this.initializeEmployees();console.log(data)});
  }
  
  initializeEmployees(){
    this.dataLoaded = false;
    this._sharedService.getEmployees().subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.employees = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("You are not Authorized !");
        this._router.navigate(['admin-login']);
      }
    });
  }

}
