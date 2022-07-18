import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private _sharedService:SharedService, private _router:Router) { }

  role = this._sharedService.getTokenData()['Role'];
  empId = this._sharedService.getTokenData()['Id'];

  employee: Employee = new Employee();

  dataLoaded:boolean = false;

  ngOnInit(): void {
    if(this.role != "employee"){
      alert("You are not Authorized !");
      this._router.navigate(['employee-login']);
    }
    this.GetEmployee();
  }

  GetEmployee(){
    this._sharedService.employeeGetEmployee(this.empId).subscribe(data=>{
      console.log(data)
      this.dataLoaded = true;      
      this.employee = data;
    });
  }

}
 