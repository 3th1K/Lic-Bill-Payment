import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url = "https://localhost:44339/api";

  constructor(private _http:HttpClient) { }

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
}
