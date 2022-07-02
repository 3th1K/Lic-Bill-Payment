import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req:any, next:any){
      let _authService = this.injector.get(AuthenticationService)
      let tokenizedRequest = req.clone({
        setHeaders : {
          Authorization: `${_authService.getToken()}`
        }
      })
      return next.handle(tokenizedRequest);
  }
}
