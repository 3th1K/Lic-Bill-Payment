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

  deleteUser(id:number):Observable<any>{
    return this._http.delete(this.url+'/admin/delete-user/'+id);
  }
}
