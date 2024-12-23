// create-user.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  standalone: false,
})
export class CreateUserComponent {
  createUserForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.createUserForm.invalid) {
      return;
    }

    const userData = this.createUserForm.value;
    this.userService.createUser(userData).subscribe(
      (response) => {
        this.successMessage = 'Utilisateur créé avec succès.';
        this.createUserForm.reset();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la création de l\'utilisateur.';
      }
    );
  }
}
