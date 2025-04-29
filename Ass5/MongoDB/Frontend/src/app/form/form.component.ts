import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-form',
  standalone: true, 
  imports: [FormsModule, CommonModule, HttpClientModule, HomeComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  submitted = false;

  formData = {
    name: '',
    prn: ''
  };

  constructor(private http: HttpClient) {}

  
  onSubmit() {
    console.log('Form Submitted!', this.formData);

    this.http.post('http://localhost:5000/api/erp/create', this.formData)
      .subscribe({
        next: (response) => {
          console.log('Server Response:', response);
          this.submitted = true;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}
