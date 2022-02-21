import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser: User = new User;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.currentUser) {
      //if requested route path needs an ROLE, check if the currentUSer has that role => if not, redirect
      if (route.data['roles']?.indexOf(this.currentUser.role) === -1) {
        this.router.navigate(['/401']);  //redirect to unauthorized page
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return true;
  }

}
