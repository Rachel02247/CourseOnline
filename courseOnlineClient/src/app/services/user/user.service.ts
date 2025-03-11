import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
type PartialUser = Partial<User>;
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = 'http://localhost:3000/api/';
  public status: 'register' | 'login' | 'none' = 'none';
  isTeacher: boolean = false;

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users`);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}users/${id}`);
  }
  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.url}auth/${this.status}`, user).pipe(
      tap(user => {
        this.isTeacher = user.role === 'teacher' || user.role === 'admin';
      }),
      catchError(error => {
        alert(this.status + " failed: " + error.message);
        return throwError(error);
      })
    );
  }
}
