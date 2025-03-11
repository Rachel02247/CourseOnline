import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../../models/course';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../../../services/course/course.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-update-course-form',
  standalone: true,
  imports: [MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseForm!: FormGroup;
  private courseId = 0;
  routerNavigate = inject(Router);
  course!: Course;
  isAdmin: boolean = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private coursesService: CourseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.isAdmin = window.sessionStorage.getItem('role') === 'admin';

    this.courseForm = this.fb.group({
      title: [''],
      description: [''],
      teacherId: ['']
    });
    this.coursesService.getCourseById(this.courseId).subscribe(res => {
      this.course = res;
      this.courseForm.patchValue({
        title: this.course.title,
        description: this.course.description,
        teacherId: this.course.teacherId
      });
    });
  }

  updateCourse() {
    if (this.courseForm.valid) {
      const updatedCourse: Course = {
        id: this.courseId,
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        teacherId: this.courseForm.get('teacherId')?.value,
      };

      this.coursesService.updateCourse(updatedCourse).subscribe({
        next: () => {
          this.routerNavigate.navigate(['courses']);
        }
      });
    }
  }

}
