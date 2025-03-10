import { Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AuthComponent } from './component/auth/auth.component';
import { CoursesComponent } from './component/course/courses/courses.component';
import { CourseDetailsComponent } from './component/course/course-details/course-details.component';
import { CourseFormComponent } from './component/course/course-form/course-form.component';
import { AddLessonComponent } from './component/course/add-lesson/add-lesson.component';

export const routes: Routes = [
    { path: '', component:  HomePageComponent},
    { path: 'auth', component:  AuthComponent },
    { path: 'courses', component:  CoursesComponent },
    { path: 'courseDet/:id', component:  CourseDetailsComponent },
    { path: 'course/:id', component:  CourseFormComponent },
    { path: 'courses/:id/lessons', component: AddLessonComponent }

];
