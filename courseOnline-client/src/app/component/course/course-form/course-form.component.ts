import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course/course.service';
import { UserService } from '../../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
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

  constructor(private courseService: CourseService, private route: ActivatedRoute
    , private router: Router, private fb: FormBuilder
  ) {} 

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    teacherId: new FormControl<string>('', [Validators.required],
      // [this.isIdValid()]
    ),
    lessons: new FormArray<FormGroup>([])
  });

  courseId!: number;
  course!: Partial<Course>;
  status!: 'add' | 'edit';
  titleVal: string = '';
  descriptionVal: string = '';
  teacherIdVal: string = '';
  lessonsVal: FormGroup[] | null = [];
  isAddLesson: boolean = false;
  lessonForm!: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.status = this.courseId == -1 ? 'add' : 'edit';
      this.loadCourse();
      this.initForm();
      console.log(this.course);
      if(this.status === 'edit') {
        this.titleVal = this.course.title ?? '';
        this.descriptionVal = this.course.description ?? '';
        this.teacherIdVal = this.course.teacherId ?? '';
      }

    });
  }

  private initForm(): void {
    console.log(this.course);
    this.form.value.title ? this.course.title : '';
    this.form.value.description ? this.course.description : '';
    this.form.value.teacherId ? this.course.teacherId : '';
    this.form.value.lessons??  [];
  }

  loadCourse(): void {

    this.courseService.courses$.subscribe(courses => {
      this.course = courses.find(c => c.id === this.courseId) ?? {};
    });
    console.log(this.course);
    console.log(this.courseService.courses$);
    

  }

  isIdValid(): boolean {
    return true;
  }

  addLesson() {
    this.router.navigate([`/courses/${this.courseId}/lessons`]);
  }

 
  
  submit() {
    if (this.form.valid) {
      const current: Partial<Course> = {
        ...this.form.value,
        title: this.form.value.title ?? undefined,
        description: this.form.value.description ?? undefined,
        teacherId: this.form.value.teacherId ?? undefined
      };

      if (this.status === 'add')
        this.courseService.addCourse(current).subscribe({
          next: () => {
            this.router.navigate(['/courses']);
          },
          error: () => {
            alert("Can't add course");
          }
        });
      else
        this.courseService.updateCourse(current).subscribe({
          next: () => {
            this.router.navigate(['/courses']);
          },
          error: () => {
            alert("Can't update course");
          }
        });
    }

  }

}
