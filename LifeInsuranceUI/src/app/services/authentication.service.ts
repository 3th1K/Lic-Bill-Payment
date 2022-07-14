import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = "https://localhost:44339/api";

  constructor(private http:HttpClient) { }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }

  adminLogin(data:any):Observable<any>{
    return this.http.post(this.url+'/admin/login', data);
  }

  adminDashboard(){
    return this.http.get(this.url+'/admin/admin-dashboard');
  }

  userLogin(data:any):Observable<any>{
    return this.http.post(this.url+'/user/login', data);
  }
}
