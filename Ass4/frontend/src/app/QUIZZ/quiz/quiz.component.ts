import { Component ,inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router ,Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  // constructor(private route: ActivatedRoute) {}

  private Route = inject(ActivatedRoute)
  private router = inject(Router);
  private http = inject(HttpClient);
  Questions:any[] = [] ;
  // create table Questions (
  //   Question_No  Int  auto_increment ,
  //   quiz_id varchar(10) ,
  //   Question varchar(200) ,
  //   option_1 varchar(100) ,
  //   option_2 varchar(100) ,
  //   option_3 varchar(100) ,
  //   option_4 varchar(100), 
  //   Answer varchar(100),
  //   foreign key (quiz_id ) REFERENCES Quiz(quiz_Id) ,
  //   primary key( Question_No , quiz_id)
  //  );
  model = { Question_No: '' , quiz_id :'' ,Question: '', option_1: '', option_2: '', option_3:'',option_4:'', Answer:'' };

  ngOnInit() {
    const quiz_id = this.Route.snapshot.paramMap.get('quiz_Id');
    console.log('Quiz ID:', quiz_id);
    this.model.quiz_id = String(quiz_id) ;
    this.fetchquestion( String(this.model.quiz_id ));
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.model)
    this.addquestion();
  }
  Navigate() {
    this.router.navigate(['/teacher']);
  }

  addquestion(): void {
    this.http.post('http://localhost:3000/create', this.model).subscribe(
      () => {
        this.fetchquestion(this.model.quiz_id);
        this.model = {Question_No: '' , quiz_id :'' ,Question: '', option_1: '', option_2: '', option_3:'',option_4:'', Answer:'' };
      },
      (error) => {
        console.error('Error adding question:', error);
      }
    );
  }

  fetchquestion(quiz_id:String): void {
    this.http.get<any[]>(`http://localhost:3000/${quiz_id}`).subscribe(
      (data) => {
        this.Questions = data;
      },
      (error) => {
        console.error('Error fetching department:', error);
      }
    );
  }

  deletequestion(Question_No:number,quiz_id:string): void {
    this.http.delete(`http://localhost:3000/delete/${Question_No}/${quiz_id}`).subscribe(
      () => {
        this.fetchquestion( this.model.quiz_id );
      },
      (error) => {
        console.error('Error deleting question:', error);
      }
    );
  }
}



