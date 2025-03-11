import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { log } from 'console';
import { MatListModule } from '@angular/material/list'
import { Lesson } from '../../../models/lesson';
import { LessonService } from '../../../services/lesson/lesson.service';

@Component({
  selector: 'app-course-details',
  imports: [MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  isTeacher: boolean = false;
  courseId!: number;
  course!: Partial<Course>;
  lessons: Lesson[] = [];

  constructor(private userService: UserService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.loadCourse();
      console.log(this.course);
      this.isTeacher = this.userService.isTeacher;
      if (this.courseId) {
        this.lessonService.getLessons(+this.courseId); 
        this.lessonService.lessons$.subscribe(lessons => {
          this.lessons = lessons;
        });
      }
    });
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.course = course;
    });
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.courseId);

  }

  editCourse() {
    this.router.navigate(['/editCourse', this.courseId])
  }
editLesson(lessonId: number) {
    this.router.navigate([`course/${this.courseId}/editLesson/${lessonId}`]);
  }
  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId, lessonId);
  }
  addLesson(){
    console.log(this.courseId);
    this.router.navigate([`course/${this.courseId}/addLesson`]);
  }
}

