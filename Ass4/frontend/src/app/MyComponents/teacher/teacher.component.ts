import { Component ,inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule, FormsModule, HttpClientModule,RouterLink],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent {
  
  private router = inject(Router);
  private http = inject(HttpClient);
  quiz:any[] = [] ;

  model = { quiz_Id: 0, quiz_name: '', quiz_description: '' };

  ngOnInit() {
    this.fetchquiz();
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.addquiz();

  }
  Navigate() {
    this.router.navigate(['quiz']);
  }
  move(id:number)
  {
     this.router.navigate(['quiz'])
    
  }

  addquiz(): void {
    this.http.post('http://localhost:3000/createquiz', this.model).subscribe(
      () => {
        this.fetchquiz();
        this.model = { quiz_Id: 0, quiz_name: '', quiz_description: ''};
      },
      (error) => {
        console.error('Error adding question:', error);
      }
    );
  }

  fetchquiz(): void {
    this.http.get<any[]>('http://localhost:3000').subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.error('Error fetching quiz :', error);
      }
    );
  }

  deletequiz(quiz_Id:number): void {
    console.log(quiz_Id)
    this.http.delete(`http://localhost:3000/deletequiz/${quiz_Id}`).subscribe(
      () => {
        this.fetchquiz();
      },
      (error) => {
        console.error('Error deleting quiz:', error);
      }
    );
  }
}
