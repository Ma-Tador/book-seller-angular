import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role.enum';
import { User } from './model/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-seller-angular';
  currentUser: User = new User;

  constructor(private authService: AuthenticationService, private router: Router){
    this.authService.currentUser.subscribe( data => {
      this.currentUser = data;
    })
  }


  isAdmin(): boolean{
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
