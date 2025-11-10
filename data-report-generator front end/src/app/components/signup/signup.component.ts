import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../serviecs/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  loading = false;

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    if (this.signupForm.invalid) {
      alert('⚠️ Please fill all required fields correctly.');
      return;
    }

    const payload = {
      ...this.signupForm.value,
      role: 'user'
    };
    this.loading = true;

    this.auth.signup(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        alert(res.message || '✅ Account created successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Signup error:', err);
        alert(err.error?.error || err.error?.message || '❌ Failed to create account');
      }
    });
  }
}
