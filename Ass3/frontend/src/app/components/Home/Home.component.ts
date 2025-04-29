import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
  <div class="flex flex-col items-center justify-center min-h-[85vh] bg-white">
    <img src="img/Logo.png" alt="College Logo" class="w-60 h-60 mb-6">
<div class="flex space-x-4 p-4">
  <button (click)="navigateToStudentSection()"
    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
    Student Section
  </button>

  <button (click)="navigateToFacultySection()"
    class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
    Faculty Section
  </button>

  <button (click)="navigateToAdminSection()"
    class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
    Admin Section
  </button>
</div>
    
  </div>
  `,
})

export class HomeComponent {
  constructor(private router: Router) {}

  navigateToStudentSection() {
    this.router.navigate(['/students']);
  }

  navigateToFacultySection() {
    this.router.navigate(['/departments']);
  }

  navigateToAdminSection() {
    this.router.navigate(['/courses']);
  }
}