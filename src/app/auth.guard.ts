import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.authService.getRole(); // Appeler getRole pour obtenir le rôle de l'utilisateur
    if (role === 'admin') {
      return true; // L'utilisateur a le rôle admin
    } else {
      this.router.navigate(['/login']); // Rediriger si le rôle n'est pas admin
      return false;
    }
  }
}
