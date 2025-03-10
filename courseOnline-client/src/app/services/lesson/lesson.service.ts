import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lessonsSubject: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  public lessons$: Observable<Lesson[]> = this.lessonsSubject.asObservable();
  private url = "http://localhost:3000/api/courses";

  constructor(private http: HttpClient) { }

  getLessons(courseId: number) {
    this.http.get<Lesson[]>(`${this.url}/${courseId}/lessons`).subscribe(
      (lessons) => {
        this.lessonsSubject.next(lessons);
      },
      (error) => alert('Error get lesson:' + error.message)
    );
  }

  addLesson(courseId: number, lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.url}/${courseId}/lessons`, lesson).pipe(
      tap(newLesson => {
        this.lessonsSubject.next([...this.lessonsSubject.getValue(), newLesson]);
      })
    );
  }
  getLessonById(courseId: number, lessonId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.url}/${courseId}/lessons/${lessonId}`);
  }

  deleteLesson(courseId: number, lessonId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${courseId}/lessons/${lessonId}`).pipe(
      tap(() => {
        const updatedLessons = this.lessonsSubject.getValue().filter(lesson => lesson.id !== lessonId);
        this.lessonsSubject.next(updatedLessons);
      })
    );
  }

  updateLesson(courseId: number, lessonId: number, lesson: Lesson): Observable<any> {
    const l={
      title: lesson.title,
      content: lesson.content,
      courseId: courseId,
    }
    return this.http.put(`${this.url}/${courseId}/lessons/${lessonId}`, l);
  }
}
