import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormComponent} from './form/form.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormComponent], // Add ErpFormComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WEB_FORM';
}
