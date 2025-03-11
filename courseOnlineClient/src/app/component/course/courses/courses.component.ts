import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { MatButtonModule } from '@angular/material/button';
import { Lesson } from '../../../models/lesson';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { Observable } from 'rxjs';
import { CourseService } from '../../../services/course/course.service';
import { UserService } from '../../../services/user/user.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CourseActivityService } from '../../../services/courseActivity/course-activity.service';

@Component({
  selector: 'app-courses',
  imports: [MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [
    {
      id: 1,
      title: 'course1',
      description: 'description1',
      teacherId: '1',
      },
    {
      id: 2,
      title: 'course2',
      description: 'description2',
      teacherId: '2',
    }
  ];

  isTeacher: boolean = false;
  userId = sessionStorage.getItem("userId");
  isMyCourses: boolean = false;
  userCourses: Course[] = [];
  // joinCourses: Course[] = [];  
  constructor(private courseService: CourseService, private router: Router,
    private courseActService: CourseActivityService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.isTeacher = this.userService.isTeacher;
    this.courseService.courses$.subscribe(c => {
      if (c.length > 0 && c !== undefined) {
        this.courses = c;
      }

    });

    if (this.userId) {
      this.courseActService.getCoursesById(parseInt(this.userId)).subscribe(courses => {
        this.userCourses = courses;
      });
    }
    this.courseActService.courses$.subscribe(courses => {
      this.userCourses = courses;
    });

  }

  isJoin(course: Course) {
    return this.userCourses.find(c => c.id === course.id) !== undefined;
  }

  join(course: Course) {
    this.courseActService.joinCourse(parseInt(this.userId ?? ""), course.id);
    this.userCourses.push(course);
  }

  leave(course: Course) {
    this.courseActService.leaveCourse(parseInt(this.userId ?? ""), course.id);
    this.userCourses = this.userCourses.filter(c => c.id !== course.id);
  }
  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe();
  }


  navToAddCourse() {
    this.router.navigate(['/addCourse']);
  }

  navToDetails(id: number) {
    this.router.navigate(['/course', id]);
  }

  toggleCourses() {
    this.isMyCourses = !this.isMyCourses;
  }
  isUserCourse(id: number) {
    return this.userCourses.find(c => c.id === id)
  }

}