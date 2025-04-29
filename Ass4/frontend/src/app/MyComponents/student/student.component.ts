import { Component,inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-student',
  imports: [FormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
private router = inject(Router);
  private http = inject(HttpClient);
  Questions:any[] = [] ;

  model = { Id:0 , selectedAnswer :''};

  ngOnInit() {
    this.fetchquestion();
   
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const firstEntry = Object.entries(form.value)[0]; 
      const [key, value] = firstEntry;
      this.model ={Id:Number(key) , selectedAnswer : String(value)}
    console.log("model : " ,this.model);
    this.submitTest();
    
    
  }

  submitAll()
  {
  


  }

  submitTest(): void {
    this.http.post('http://localhost:3000/student',this.model).subscribe(
      () => {
        this.fetchquestion();
        this.model = {Id:0, selectedAnswer :''};
      },
      (error) => {
        console.error('Error submiting  test:', error);
      }
    );
  }

  fetchquestion(): void {
    this.http.get<any[]>('http://localhost:3000').subscribe(
      (data) => {
        this.Questions = data;
      },
      (error) => {
        console.error('Error fetching question:', error);
      }
    );
  }

  
}

// import { Component, inject } from '@angular/core';
// import { NgForm , FormsModule} from '@angular/forms';
// import { HttpClient ,HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-student',
//   standalone: true,
//   imports: [CommonModule,FormsModule,HttpClientModule],
//   templateUrl: './student.component.html',
//   styleUrl: './student.component.scss'
// })
// export class StudentComponent {
//   private router = inject(Router);
//   private http = inject(HttpClient);
//   Questions: any[] = [];
//   model = { Id: 0, selectedAnswer: '' };

//   ngOnInit(): void {
//     this.fetchQuestions();
//     this.loadAnswersFromLocalStorage();
//   }

//   // 🚀 Fetch questions from the API
//   fetchQuestions(): void {
//     this.http.get<any[]>('http://localhost:3000').subscribe(
//       (data) => {
//         this.Questions = data;
//         this.loadAnswersFromLocalStorage();
//       },
//       (error) => {
//         console.error('Error fetching questions:', error);
//       }
//     );
//   }

//   // 📝 On single question submission
//   onSubmit(form: NgForm): void {
//     // localStorage.clear();
//     const firstEntry = Object.entries(form.value)[0];
//     if (firstEntry) {
//       const [key, value] = firstEntry;
//       this.model = { Id: Number(key), selectedAnswer: String(value) };

//       // Store answer in localStorage
     
//       const answers = this.getStoredAnswers();
//       answers[this.model.Id] = this.model.selectedAnswer;
//       localStorage.setItem('quizAnswers', JSON.stringify(answers));

//       console.log('Submitted Model:', this.model);
//       // this.submitSingleAnswer();
//     }
//   }

//   // 📤 Submit a single answer
//   submitSingleAnswer(): void {
//     this.http.post('http://localhost:3000/student', this.model).subscribe(
//       () => {
//         console.log('Answer submitted successfully.');
//         this.model = { Id: 0, selectedAnswer: '' };
//       },
//       (error) => {
//         console.error('Error submitting answer:', error);
//       }
//     );
//   }

//   // 📥 Load saved answers from localStorage
//   loadAnswersFromLocalStorage(): void {
//     const savedAnswers = this.getStoredAnswers();
//     this.Questions.forEach(question => {
//       if (savedAnswers[question.Id]) {
//         question.selectedAnswer = savedAnswers[question.Id];
//       }
//     });
//   }

//   // 🔄 Helper to get stored answers
//   getStoredAnswers(): { [key: number]: string } {
//     const stored = localStorage.getItem('quizAnswers');
//     console.log(stored)
//     return stored ? JSON.parse(stored) : {};
   
//   }

//   // 🚀 Submit all answers after quiz completion
//   submitAllAnswers(): void {
//     const answers = this.getStoredAnswers();
//     const finalSubmission = Object.entries(answers).map(([id, answer]) => ({
//       Question_Id: Number(id),
//       Selected_Ans: answer
//     }));

//     this.http.post('http://localhost:3000/submit-all', finalSubmission).subscribe(
//       () => {
//         console.log('All answers submitted successfully.');
//         localStorage.removeItem('quizAnswers');
//         alert('Quiz submitted successfully!');
//       },
//       (error) => {
//         console.error('Error submitting all answers:', error);
//       }
//     );
//   }
// }

