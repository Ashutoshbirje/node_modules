import { Component,inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-student',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './quiz-student.component.html',
  styleUrl: './quiz-student.component.scss'
})
export class QuizStudentComponent {
  private router = inject(Router);
  private Route = inject(ActivatedRoute)
  private http = inject(HttpClient);
  Questions:any[] = [] ;
  
  model = {student_Id: 0, Quiz_Id : ' ' ,Question_Id:0 , Selected_Ans :'',Answer:''};
  quiz_id :string = '' ;
  Answer :string = '' ;
  student_Id :number = 1;
  getAnswer(Ans:String)
  {
   this.Answer = String(Ans) ;
  }
  ngOnInit() {
     this.quiz_id  =  String(this.Route.snapshot.paramMap.get('quiz_Id'));
    console.log('Quiz ID:', this.quiz_id);
    // this.model.quiz_id = String(quiz_id) ;
    this.fetchquestion(String(this.quiz_id));
   
  }
  
  onSubmit(form: NgForm) {
    console.log(form.value);

    const firstEntry = Object.entries(form.value)[0]; 
      const [key, value] = firstEntry;
      this.model ={ student_Id : this.student_Id , Quiz_Id: this.quiz_id ,Question_Id:Number(key) , Selected_Ans : String(value) , Answer : this.Answer}
    console.log("model : " ,this.model);
    this.submitTest();
  }
  
  submitAll()
  {
    this.router.navigate(['/student']);
  
  }

  submitTest(): void {
    this.http.post('http://localhost:3000/api/result',this.model).subscribe(
      () => {
        // this.fetchquestion(String(quiz_id));
        this.model = {student_Id: 0, Quiz_Id : ' ' ,Question_Id:0 , Selected_Ans :'',Answer:''};
      },
      (error) => {
        console.error('Error submiting  test:', error);
      }
    );
  }

  fetchquestion(quiz_Id:String): void {
    this.http.get<any[]>(`http://localhost:3000/${quiz_Id}`).subscribe(
      (data) => {
        this.Questions = data;
      },
      (error) => {
        console.error('Error fetching question:', error);
      }
    );
  }


}


