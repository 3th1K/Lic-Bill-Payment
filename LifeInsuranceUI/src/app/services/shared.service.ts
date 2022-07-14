import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url = "https://localhost:44339/api";

  constructor(private _http:HttpClient, private _authService:AuthenticationService, private _jwtHelper: JwtHelperService) { }

  getTokenData():any{
    const token = this._authService.getToken();
    if(token && !this._jwtHelper.isTokenExpired(token)){
      const tokenData =  this._jwtHelper.decodeToken(token);
      return { 'Role': tokenData.role, 'Id': tokenData.nameid }
    }
    return null;
  }


  getUsers():Observable<any>{
    return this._http.get(this.url+'/admin/get-users');
  }

  getUser(id: number):Observable<any>{
    return this._http.get(this.url+'/admin/get-user/'+id);
  }

  deleteUser(id:number):Observable<any>{
    return this._http.delete(this.url+'/admin/delete-user/'+id);
  }

  createEmployee(data:any):Observable<any>{
    return this._http.post(this.url+'/admin/create-employee',data);
  }

  getEmployees():Observable<any>{
    return this._http.get(this.url+'/admin/get-employees');
  }

  getEmployee(id: number):Observable<any>{
    return this._http.get(this.url+'/admin/get-employee/'+id);
  }

  updateEmployee(id:number, data:any):Observable<any>{
    return this._http.put(this.url+'/admin/update-employee/'+id, data);
  }

  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(this.url+'/admin/delete-employee/'+id);
  }

  registerUser(data:any):Observable<any>{
    return this._http.post(this.url+'/user/register',data);
  }
}
