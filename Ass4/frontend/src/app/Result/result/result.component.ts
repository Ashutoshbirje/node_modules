import { Component,inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

private router = inject(Router);

  private http = inject(HttpClient);
  Questions:any[] = [] ;
  result: any = {};

 

  quiz_id :string = '' ;
  Answer :string = '' ;
  student_Id :number = 1;

  ngOnInit() {
   this.fetchquestion(String(this.quiz_id));
    }

    getMarks (quiz_id:number)
    {
      console.log("Get Result is called using quiz id : " ,quiz_id)
this.fetchResult(quiz_id) ;

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
// fetchresult(quiz_Id:String): void {
//   this.http.get<any[]>(`http://localhost:3000/api/getresult/${quiz_Id}`).subscribe(
//     (res: any) => {
//       this.results[quiz_Id] = res;
//     },
      
   
//     (error) => {
//       console.error('Error fetching results:', error);
//     }
//   );
// }

fetchResult(quiz_Id: number) {
  console.log(quiz_Id)
  this.http.get(`http://localhost:3000/api/getresult/${quiz_Id}`).subscribe(
    (res: any) => {
      this.result[quiz_Id] = res;
    },
    (err) => {
      console.error('Error fetching results:', err);
    }
  );
}

}
