import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErpFormComponent } from './erp-form/erp-form.component'; // Import the ERP form component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ErpFormComponent], // Add ErpFormComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WEB_FORM';
}
