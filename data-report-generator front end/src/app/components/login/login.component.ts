import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../serviecs/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!).subscribe({
      next: () => {
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    this.router.navigate(['/admin']);
  } else {
    this.router.navigate(['/upload']);
  }
},

      error: () => alert('Invalid credentials')
    });
  }
}
