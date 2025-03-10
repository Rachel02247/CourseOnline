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
  constructor(private userService: UserService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.loadCourse();
      console.log(this.course);
      if (this.userService.isTeacher) {
        this.isTeacher = true;
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
    this.router.navigate(['/course', this.courseId])
  }

}
