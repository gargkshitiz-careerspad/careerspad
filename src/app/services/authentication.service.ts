import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

class User {
  token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(obj) {
    localStorage.setItem('currentUser', JSON.stringify(obj));
    this.currentUserSubject.next(obj);
    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //   .pipe(map(user => {
    //     if (user && user.token) {
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //     return user;
    //   }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    //this.router.navigate(['/login']);
    
  }
  updateProfilePic(img){
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    obj.pic = img;
    localStorage.setItem('currentUser', JSON.stringify(obj));
    this.currentUserSubject.next(obj);
  }
}
