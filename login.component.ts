import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-icon">S</div>
          <h2>Welcome back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              formControlName="email" 
              placeholder="Enter your email"
              [class.error]="isFieldInvalid('email')"
            >
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              Valid email is required
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password" 
              placeholder="••••••••"
              [class.error]="isFieldInvalid('password')"
            >
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              Password is required
            </div>
          </div>

          <div class="form-actions">
            <div class="remember-me">
              <input type="checkbox" id="remember">
              <label for="remember">Remember for 30 days</label>
            </div>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>

          <div *ngIf="errorMessage" class="alert-error">
            {{ errorMessage }}
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn-submit">
            <span *ngIf="!isLoading">Sign in</span>
            <span *ngIf="isLoading">Signing in...</span>
          </button>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <a routerLink="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f9fafb;
      padding: 1rem;
    }
    .login-card {
      background: white;
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
      border-radius: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid #f3f4f6;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo-icon {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.5rem;
      margin: 0 auto 1.5rem;
    }
    h2 {
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.5rem;
    }
    p {
      color: #6b7280;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid #d1d5db;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
    input.error {
      border-color: #ef4444;
    }
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      font-size: 0.875rem;
    }
    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #374151;
    }
    .forgot-password {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }
    .btn-submit {
      width: 100%;
      background-color: #4f46e5;
      color: white;
      padding: 0.75rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-submit:hover:not(:disabled) {
      background-color: #4338ca;
    }
    .btn-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .alert-error {
      background-color: #fef2f2;
      color: #991b1b;
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }
    .login-footer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.875rem;
    }
    .login-footer a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
    }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage = '';

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

    isFieldInvalid(field: string): boolean {
        const control = this.loginForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    async onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const { email, password } = this.loginForm.value;

            try {
                const success = await this.authService.login(email, password);
                if (success) {
                    // Router navigation is handled in AuthService, but ensured here just in case? 
                    // No, usually best to trust service or do it here. Service does it.
                } else {
                    this.isLoading = false;
                    this.errorMessage = 'Invalid email or password. Please try again.';
                }
            } catch (e) {
                this.isLoading = false;
                this.errorMessage = 'An error occurred. Please try again.';
                console.error(e);
            }
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}