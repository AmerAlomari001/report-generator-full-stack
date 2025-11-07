import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
