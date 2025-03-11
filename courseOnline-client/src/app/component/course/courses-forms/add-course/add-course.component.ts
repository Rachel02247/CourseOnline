
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CourseService } from '../../../../services/course/course.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-course',
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
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  routerNavigate = inject(Router);
  userId = 0;
  isAdmin: boolean = false;


  constructor(private route: ActivatedRoute, private coursesService: CourseService, private fb: FormBuilder, private http: HttpClient) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      teacherId: ['', Validators.required]
    });
  }
  addCourse() {
    if (!this.isAdmin) {
      this.courseForm.patchValue({
        teacherId: this.userId
      });
    }
    if (this.courseForm.valid) {
      this.coursesService.addCourse(this.courseForm.value).subscribe({
        next: res => {
          this.courseForm.reset();
          this.routerNavigate.navigate(['courses']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.isAdmin = window.sessionStorage.getItem('role') === 'admin';

  }
}
