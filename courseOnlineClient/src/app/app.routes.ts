import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AuthComponent } from './component/auth/auth.component';
import { CoursesComponent } from './component/course/courses/courses.component';
import { CourseDetailsComponent } from './component/course/course-details/course-details.component';
import { CourseFormComponent } from './component/course/course-form/course-form.component';
import { AddCourseComponent } from './component/course/courses-forms/add-course/add-course.component';
import { EditCourseComponent } from './component/course/courses-forms/edit-course/edit-course.component';
import { UpdateLessonComponent } from './component/course/lessons-forms/update-lesson/update-lesson.component';
import { AddLessonComponent } from './component/course/lessons-forms/add-lesson/add-lesson.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'courses', component: CoursesComponent },
    {path: 'course/:id', component: CourseDetailsComponent,},
    { path: 'addCourse', component: AddCourseComponent },
    { path: 'editCourse/:id', component: EditCourseComponent },
    { path: 'course/:id/addLesson', component: AddLessonComponent },
    { path: 'course/:id/editLesson/:lessonId', component: UpdateLessonComponent },

];

