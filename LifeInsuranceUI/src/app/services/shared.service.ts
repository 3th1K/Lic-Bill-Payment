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
      return { 'Role': tokenData.role, 'Id': parseInt(tokenData.nameid) }
    }
    return null;
  }
 
  //admin

  adminGetUsers():Observable<any>{
    return this._http.get(this.url+'/admin/get-users');
  }

  adminGetUser(id: number):Observable<any>{
    return this._http.get(this.url+'/admin/get-user/'+id);
  }

  adminGetUserDetails(id: number):Observable<any>{
    return this._http.get(this.url+'/admin/get-user-details/'+id);
  }

  adminUpdateUser(data:any):Observable<any>{
    return this._http.put(this.url+'/admin/update-user',data);
  }

  adminUpdateUserDetails(data:any):Observable<any>{
    return this._http.put(this.url+'/admin/update-user-details',data);
  }

  adminDeleteUser(id:number):Observable<any>{
    return this._http.delete(this.url+'/admin/delete-user/'+id);
  }

  adminGetPolicies():Observable<any>{
    return this._http.get(this.url+'/admin/get-policies');
  }

  createEmployee(data:any):Observable<any>{
    return this._http.post(this.url+'/admin/create-employee',data);
  }

  adminGetEmployees():Observable<any>{
    return this._http.get(this.url+'/admin/get-employees');
  }

  adminGetEmployee(id: number):Observable<any>{
    return this._http.get(this.url+'/admin/get-employee/'+id);
  }

  updateEmployee(id:number, data:any):Observable<any>{
    return this._http.put(this.url+'/admin/update-employee/'+id, data);
  }

  adminDeleteEmployee(id:number):Observable<any>{
    return this._http.delete(this.url+'/admin/delete-employee/'+id);
  }

  //user

  registerUser(data:any):Observable<any>{
    return this._http.post(this.url+'/user/register',data);
  }

  userGetUser(id:number):Observable<any>{
    return this._http.get(this.url+'/user/get-user/'+id);
  }

  userGetUserDetails(id:number):Observable<any>{
    return this._http.get(this.url+'/user/get-user-details/'+id);
  }

  userUpdateUser(data:any):Observable<any>{
    return this._http.put(this.url+'/user/update-user',data);
  }

  userUpdateUserDetails(data:any):Observable<any>{
    return this._http.put(this.url+'/user/update-user-details',data);
  }

  userGetPolicies():Observable<any>{
    return this._http.get(this.url+'/user/get-policies');
  }

}
