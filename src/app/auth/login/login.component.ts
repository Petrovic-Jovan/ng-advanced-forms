import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  // Define a reactive form with email and password fields
  form = new FormGroup({
    // Initial values are defined in the parentheses of the FormControl constructor
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form);
  }
}
