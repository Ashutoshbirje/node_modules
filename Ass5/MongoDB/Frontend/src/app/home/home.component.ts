import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  submitted = false; // ✅ Add this

  onSubmit() {
    console.log('Form Submitted!');
    this.submitted = true; // ✅ Set submitted to true
  }

}
