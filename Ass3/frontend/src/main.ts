import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/Home/Home.component';
import { StudentComponent } from './app/components/student/student.component';
import { InstructorComponent } from './app/components/instructor/instructor.component';
import { CourseComponent } from './app/components/course/course.component';
import { DepartmentComponent } from './app/components/department/department.component';
import { ClassroomComponent } from './app/components/classroom/classroom.component';
import { AdvisorComponent } from './app/components/advisor/advisor.component';
import { PrereqComponent } from './app/components/prereq/prereq.component';
import { SectionComponent } from './app/components/section/section.component';
import { TimeSlotComponent } from './app/components/time-slot/time-slot.component';
import { TeachesComponent } from './app/components/teaches/teaches.component';
import { TakesComponent } from './app/components/takes/takes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentComponent },
  { path: 'instructors', component: InstructorComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'classrooms', component: ClassroomComponent },
  { path: 'advisors', component: AdvisorComponent },
  { path: 'prereqs', component: PrereqComponent },
  { path: 'sections', component: SectionComponent },
  { path: 'time-slots', component: TimeSlotComponent },
  { path: 'teaches', component: TeachesComponent },
  { path: 'takes', component: TakesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
  ]
}).catch(err => console.error(err));
