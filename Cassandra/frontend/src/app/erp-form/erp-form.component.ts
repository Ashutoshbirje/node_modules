import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erp-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './erp-form.component.html',
  styleUrls: ['./erp-form.component.css']
})
export class ErpFormComponent {
  erpForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.erpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      prn: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    console.log('Submit button clicked!');  
    if (this.erpForm.valid) {
      console.log('Form Data:', this.erpForm.value);  // Debugging Step 1
      const formData = this.erpForm.value;
  
      this.http.post('http://localhost:5000/api/erp/create', formData)
        .subscribe(response => {
          console.log('Server Response:', response);  // Debugging Step 2
          alert('Form submitted successfully!');
        }, error => {
          console.error('Error:', error);
          alert('Failed to submit the form.');
        });
    } else {
      console.log('Form Invalid:', this.erpForm.errors); // Debugging Step 3
    }
  }
}
