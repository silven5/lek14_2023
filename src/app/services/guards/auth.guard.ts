import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import "firebase/auth";
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
     private authService: AuthService, 
  
    private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn) {
   
      this.router.navigate(["/tabs/tab1"]);
       return false;
    }
  
     this.authService.isLoggedIn;
    return true;
  
  }
}
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean 
//     | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }
