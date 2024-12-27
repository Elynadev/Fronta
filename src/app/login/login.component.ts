// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        if (response.user.role==="user") {
          console.log("je suis dans le user");

          this.router.navigate(['/dashboard']);

        }
        console.log(response.user.role);



      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Identifiants incorrects'; // Invalid credentials
        } else {
          this.errorMessage = 'Erreur de connexion, veuillez réessayer.'; // General error
        }
      }
    );
  }
}
