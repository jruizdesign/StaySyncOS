import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600 blur-[100px]"></div>
         <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600 blur-[100px]"></div>
      </div>

      <div class="w-full max-w-md p-8 relative z-10 animate-fade-in">
        <!-- Brand -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-900/50 mb-4">
             <span class="text-3xl font-bold text-white">S</span>
          </div>
          <h1 class="text-3xl font-bold text-white tracking-tight">StaySyncOS</h1>
          <p class="text-slate-400 mt-2">Enterprise Property Management</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form (submit)="onSubmit($event)" class="space-y-6">
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Email Address</label>
              <div class="relative">
                <input [(ngModel)]="email" name="email" type="email" 
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="name@example.com" required>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Password</label>
              <div class="relative">
                <input [(ngModel)]="password" name="password" type="password"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="Enter password" required>
              </div>
            </div>

            @if (error()) {
              <div class="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm text-center">
                {{ errorMessage() }}
              </div>
            }

            <button type="submit" [disabled]="loading()"
              class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              {{ loading() ? 'Processing...' : (isSignUp() ? 'Create Account' : 'Sign In') }}
            </button>
            
            <div class="text-center mt-4">
               <button type="button" (click)="toggleMode()" class="text-sm text-slate-400 hover:text-white transition-colors">
                  {{ isSignUp() ? 'Already have an account? Sign In' : 'Need an account? Create one' }}
               </button>
            </div>
          </form>
        </div>
        
        <p class="text-center text-slate-500 text-xs mt-8">
          &copy; 2024 StaySyncOS. Powered by Firebase.
        </p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.5s ease-out; }
  `]
})
export class LoginComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  private data = inject(DataService);

  email = '';
  password = '';
  isSignUp = signal(false);
  loading = signal(false);
  error = signal(false);
  errorMessage = signal('');

  toggleMode() {
    this.isSignUp.set(!this.isSignUp());
    this.error.set(false);
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading.set(true);
    this.error.set(false);
    this.errorMessage.set('');

    try {
      if (this.isSignUp()) {
        await this.auth.signup(this.email, this.password);
      } else {
        await this.auth.login(this.email, this.password);
      }

      // Wait for auth state to propagate (fix for race condition)
      let attempts = 0;
      while (!this.auth.currentUser() && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      // Force data refresh to ensure guards have fresh data
      try {
        await this.data.currentHotelQuery.refetch();
      } catch (err) {
        console.warn('Data refetch failed', err);
      }
      this.router.navigate(['/dashboard']);

    } catch (err: any) {
      this.error.set(true);
      this.loading.set(false);

      console.error('Auth error:', err);

      // Handle specific error codes
      if (err.code === 'auth/network-request-failed') {
        this.errorMessage.set('Unable to connect. Please check your internet connection and try again.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        this.errorMessage.set('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/email-already-in-use') {
        this.errorMessage.set('This email is already in use. Please sign in instead.');
      } else if (err.code === 'auth/too-many-requests') {
        this.errorMessage.set('Too many failed attempts. Please try again later.');
      } else if (err.message && (err.message as string).includes('Security check')) {
        this.errorMessage.set(err.message);
      } else {
        this.errorMessage.set('An error occurred during authentication. Please try again.');
      }
    }
  }
}