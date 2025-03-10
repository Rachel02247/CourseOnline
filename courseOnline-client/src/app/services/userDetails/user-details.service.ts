// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { User } from '../../models/user';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserDetailsService {

//   private userSubject = new BehaviorSubject<Partial<User>>(this.getUserFromStorage());
//   user$ = this.userSubject.asObservable();

//   setUser(user: Partial<User>) {
//     this.userSubject.next(user);
//     this.saveUserToStorage(user);
//   }

//   getUser(): Observable<Partial<User>> {
//     return this.user$;
//   }

//   getToken(): string {
//     return this.userSubject.getValue()?.token || '';
//   }


//   clearUser(): void {
//     this.userSubject.next(new User('', '', '', '', '', ''));
//     sessionStorage.removeItem('user'); 
//   }


//   saveUserToStorage(user: any) {
//       sessionStorage.setItem('userData', JSON.stringify(user));
//   }

// //   getUserFromStorage(){
// //     const userData: string | null = null;
// //     if (typeof window !== 'undefined') {
// //       const user = window.sessionStorage.getItem('user');
// //       const userData = sessionStorage.getItem('userData');
// //     }
// //     return userData ? JSON.parse(userData) : null;
// // }
// getUserFromStorage() {
//   try {
//       if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
//           const userData = sessionStorage.getItem('userData');
//           return userData ? JSON.parse(userData) : null;
//       }
//   } catch (error) {
//       console.error("Error accessing sessionStorage:", error);
//   }
//   return null;
// }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private userSubject = new BehaviorSubject<Partial<User>>(this.getUserFromSessionStorage());
  user$ = this.userSubject.asObservable();

getUserFromSessionStorage() {
  try {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
          const userData = sessionStorage.getItem('userData');
          return userData ? JSON.parse(userData) : null;
      }
  } catch (error) {
      console.error("Error accessing sessionStorage:", error);
  }
  return null;
}
saveUserToSessionStorage(user: any) {
  sessionStorage.setItem('userData', JSON.stringify(user));
}
getUser():Observable<Partial<User>>{
  return this.user$;
}
setUser(user:Partial<User>){
  this.userSubject.next(this.getUserFromSessionStorage());
this.saveUserToSessionStorage(user);
}
getToken(): string {
  return this.userSubject.getValue()?.token || '';
}

clearUser(): void {
  this.userSubject.next({ id: '', name: '', email: '', password: '', role: '', token: '' });
  sessionStorage.removeItem('user'); 
}
}