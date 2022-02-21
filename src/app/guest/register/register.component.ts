import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  fontAwesomeUser = faUserCircle; //font awesome object, used to display user-image in register.html
  errorMessage: string = "";


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    //if already*session user logged in, instead of registration page, redirect to own user page
    if(this.authService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
  }


  register() {
    this.authService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if (err.status === 409) {
        this.errorMessage = 'Username already used';
      } else {
        this.errorMessage = 'Unknowd error by registration: ' + err;
        console.log(err);//for debugging
      }
    }
    )
  }

}
