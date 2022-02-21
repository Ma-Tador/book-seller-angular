import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//we config the backedn URL in the environment.ts file //for prod, in environment.ptod.ts
const API_URL = '${environment.BASE_URL}/api/authentication'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  //we store user details in the browser's local storage -> avail even if session close
  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsString = localStorage.getItem('currentUser');
    //if user details from prev session, get details, else set them to null
    if(storageUserAsString){
      storageUser = JSON.parse(storageUserAsString);
    }
    //BehaviorSubj can subscribe to or listen to events
    //if BehaviorSubj updated, it will notify subscribers 
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable(); 
   }

   //take User Details synchronous from the currentDetails BehaviorSubject
   public get currentUserValue(): User{
    return this.currentUserSubject.value;
   }

   login(user: User): Observable<any>{
     //return this.http.post<any>(API_URL + 'sign-in', user).pipe(
      return this.http.post<any>('http://localhost:8080/api/authentication/sign-in', user).pipe(
       map( response => { 
         if(response){
           localStorage.setItem('currentUser', JSON.stringify(response));//save curUser in Browser storage
           this.currentUserSubject.next(response); //set next val of BehSubj to currentUser
          }
        return response;
        }
      )
     );
   }


   register(user: User): Observable<any>{
     //API_URL + '/sign-up', user);
     return this.http.post<any>('http://localhost:8080/api/authentication/sign-up', user); 
   }

   logout(){
     localStorage.removeItem('currentUser'); //remove from BrowserStorage session the curUser
     this.currentUserSubject.next(new User); //set as new val a null/empty User
   }

}
