import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css']
})
export class GetEmployeeComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router:Router) { }

  role = this._sharedService.getTokenData()['Role'];
  employee: Employee = new Employee();
  id: any;
  dataLoaded:boolean = false;

  ngOnInit(): void {
    if(this.role != "admin"){
      alert("You are not Authorized !");
      this._router.navigate(['admin-login']);
    }

    this._route.queryParamMap.subscribe(params=>{
      this.id = params.get('id');
      this.initializeEmployee();
      console.log(this.employee.Id);
    });

  }

  initializeEmployee(){
    this.dataLoaded = false;
    this._sharedService.adminGetEmployee(this.id).subscribe({
      next : (data:any)=>{
        if(data)
          this.dataLoaded = true;
        this.employee = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        alert("User Not Found");
        this._router.navigate(['get-employees']);
      }
    });
  }

}
