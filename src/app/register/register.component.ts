import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:false
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialisation du formulaire réactif
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]], // Définit le champ 'name' avec une validation requise
      email: ['', [Validators.required, Validators.email]], // Définit le champ 'email' avec validation d'email
      password: ['', [Validators.required, Validators.minLength(6)]] ,// Définit le champ 'password' avec une longueur minimale
      role: ['user', [Validators.required]]
     });
  }

  /**
   * Gère la soumission du formulaire
   */
  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          alert('Enregistrement réussi !');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur:', error.error); // Affiche les erreurs spécifiques retournées par Laravel
          this.errorMessage = error.error.message || 'Une erreur est survenue lors de l’enregistrement.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
    }
  }

}
