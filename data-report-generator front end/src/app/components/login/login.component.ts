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

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.loading = true;

    this.auth.login(email!, password!).subscribe({
      next: (res: any) => {
        this.loading = false;

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('role', res.user.role);

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/upload']);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert(err.error?.message || '❌ Invalid credentials');
      }
    });
  }
}
