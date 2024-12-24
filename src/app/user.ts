export interface User {
  id?: number; // Optionnel, car l'ID peut être généré par le backend
  name: string;
  email: string;
  password?: string; // Optionnel, pour éviter de manipuler les mots de passe directement
  role?: string; // Par exemple, "admin" ou "user"
  createdAt?: Date; // Date de création, si votre API le fournit
  updatedAt?: Date; // Date de mise à jour, si nécessaire
}
