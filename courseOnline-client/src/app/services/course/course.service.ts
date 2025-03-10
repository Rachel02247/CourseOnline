import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, tap, throwError } from 'rxjs';
import { Course } from '../../models/course';
import { UserDetailsService } from '../userDetails/user-details.service';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = 'http://localhost:3000/api/courses'; // החלף בכתובת ה-API שלך
  private coursesSubject = new BehaviorSubject<Course[]>([]);//!
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();//!
  constructor(private http: HttpClient) {
    this.getCourses();
  }

  private getCourses(): void {
    this.http.get<Course[]>(this.url).subscribe(
      (courses) => {
        this.coursesSubject.next(courses);
      }
    );;
  }

  updateCourse(course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course).pipe(
      tap(() => this.getCourses()));
  }
  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${courseId}`);
  }


  addCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.url, course).pipe(
      tap(() => this.getCourses()));
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      tap(() => {
      this.getCourses();
    }),
    catchError( 
      error => {
        alert("deleteCourse failed: " + error.message);
        return throwError(error);
      })
    );
  }
}