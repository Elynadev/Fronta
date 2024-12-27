import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de votre API backend
  private helper = new JwtHelperService(); // Utilitaire pour gérer les tokens JWT

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Effectue une connexion utilisateur.
   * @param credentials - Objet contenant `email` et `password`.
   * @returns Observable avec la réponse du backend.
   */

login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    catchError(error => {
      // Handle specific error responses if needed
      return throwError(error);
    })
  );
}
  /**
   * Enregistre un nouvel utilisateur.
   * @param user - Objet contenant les informations de l'utilisateur.
   * @returns Observable avec la réponse du backend.
   */
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Crée un utilisateur (par un administrateur).
   * @param user - Objet utilisateur à créer.
   * @returns Observable avec la réponse du backend.
   */
  createUser(user: { name: string; email: string; role: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, user);
  }

  /**
   * Vérifie si un utilisateur est authentifié.
   * @returns `true` si le token est valide, `false` sinon.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.helper.isTokenExpired(token);
  }

  /**
   * Déconnecte l'utilisateur en supprimant son token.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Récupère le rôle de l'utilisateur à partir du token.
   * @returns Le rôle de l'utilisateur, ou `null` si non authentifié.
  //  */
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null; // Si pas de token, aucun rôle.
    }
    const decodedToken = this.helper.decodeToken(token); // Décoder le token JWT
    return decodedToken ? decodedToken.role : null; // Retourner le rôle si présent dans le payload
  }
}

