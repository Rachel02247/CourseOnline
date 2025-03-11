import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course/course.service';
import { UserService } from '../../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { log } from 'console';

@Component({
  selector: 'app-edit-course',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {



  form!: FormGroup;
  isAdmin: boolean = false;
  courseId!: number;
  course!: Partial<Course>;
  status!: 'add' | 'edit';
  titleVal: string = '';
  isAddLesson: boolean = false;
  lessonForm!: FormGroup;
  userId: string | null = sessionStorage.getItem("userId");

  constructor(private courseService: CourseService, private route: ActivatedRoute
    , private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      teacherId: new FormControl<string>('', [Validators.required],),
      // lessons: new FormArray<FormGroup>([])
    });
  } 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
      this.status = this.courseId == -1 ? 'add' : 'edit';
      this.loadCourse();
      this.initForm();
      this.isAdmin = window.sessionStorage.getItem('role') === 'admin';
  }

  private initForm(): void {
    this.form.value.title ? this.course.title : '';
    this.form.value.description ? this.course.description : '';
    this.form.value.teacherId ? this.course.teacherId : '';
    // this.form.value.lessons??  [];
  }

  loadCourse(): void {
    this.courseService.courses$.subscribe(courses => {
      this.course = courses.find(c => c.id === this.courseId) ?? {};
    });
  }

  addLesson() {
    this.router.navigate([`/courses/${this.courseId}/lessons`]);
  }

  
  onSubmit() {
console.log("submit");
    debugger;
    if (true) {
      if (this.status === 'add') {
        debugger;
            this.courseService.addCourse(this.form.value).subscribe({
              next: res => {
                this.form.reset();
                this.router.navigate(['/courses']);
              } });
          }
      else
        this.courseService.updateCourse(this.form.value).subscribe({
          next: () => {
            this.router.navigate(['/courses']);
          },
          error: () => {
            alert("Can't update course");
          }
        });
    }
    this.router.navigate(['/courses']);

  }
}
