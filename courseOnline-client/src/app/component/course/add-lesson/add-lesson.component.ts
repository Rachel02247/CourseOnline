import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../services/lesson/lesson.service';
@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent implements OnInit {
  lessonForm!: FormGroup;
  courseId = 0;

  constructor(private route: ActivatedRoute,private router: Router, private coursesService: LessonService, private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  addLesson() {
    if (this.lessonForm.valid) {
      this.coursesService.addLesson(this.courseId, this.lessonForm.value).subscribe({
        next: () => {
          this.router.navigate(['/course', this.courseId]);
        },
        error: err => {
          console.error('Error: add lesson', err);
          this.router.navigate(['/course', this.courseId]);

        }
      });
    }
  }

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
  }
}

