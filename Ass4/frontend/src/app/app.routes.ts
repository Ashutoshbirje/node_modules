import { Routes } from '@angular/router';
import { StudentComponent } from './MyComponents/student/student.component';
import { TeacherComponent } from './MyComponents/teacher/teacher.component';
import { QuizComponent } from './QUIZZ/quiz/quiz.component';
import { QuizStudentComponent } from './QUIZZ/quiz-student/quiz-student.component';
import { ResultComponent } from './Result/result/result.component';

export const routes: Routes = [
    {path : 'student', component :StudentComponent},
    {path : 'teacher', component :TeacherComponent},
    {path : 'result', component :ResultComponent},
    { path: 'teacher/quiz/:quiz_Id', component: QuizComponent },
    { path: 'student/quiz/:quiz_Id', component: QuizStudentComponent }

];
