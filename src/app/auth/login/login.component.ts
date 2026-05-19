import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

// Custom validator function that checks if the control's value contains a question mark
// Must receive an AbstractControl as an argument and return either null (if valid) or an object with error information (if invalid)
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  } else {
    // Return an object with a key that describes the error and a value that can provide additional information about the error
    return { doesNotContainQuestionMark: true };
  }
}

// Example of an asynchronous validator function that simulates checking if an email is unique
// It needs to return an Observable that emits either null (if valid) or an object with error information (if invalid)
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ emailNotUnique: true });
}

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
    // Validators can also be added in the same place, for example: new FormControl('', Validators.required)
    //
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      // Custom validators are added in the same way as built-in validators, just by including the custom
      // validator function in the array of validators (no need to call the function, just pass the reference to it)
      validators: [
        Validators.minLength(6),
        Validators.required,
        mustContainQuestionMark,
      ],
      asyncValidators: [emailIsUnique],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  // validator can also be added later in form submission ie. this.form.get('email').setValidators(Validators.required);
  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
