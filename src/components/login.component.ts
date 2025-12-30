import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
          <form (submit)="onLogin($event)" class="space-y-6">
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Property ID / Username</label>
              <div class="relative">
                <input [(ngModel)]="username" name="username" type="text" 
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="Enter username">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Password</label>
              <div class="relative">
                <input [(ngModel)]="password" name="password" type="password"
                  class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="Enter password">
              </div>
            </div>

            @if (error()) {
              <div class="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm text-center">
                Invalid credentials. Please try again.
              </div>
            }

            <button type="submit" 
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              Sign In to Dashboard
            </button>
          </form>

          <!-- Demo Credentials Helper -->
          <div class="mt-8 pt-6 border-t border-white/10">
            <p class="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">Demo Credentials</p>
            <div class="grid grid-cols-3 gap-2">
                <div class="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700 cursor-pointer hover:bg-slate-700/50 transition-colors"
                     (click)="fillCredentials('admin', 'admin123')">
                    <div class="text-xs text-indigo-400 font-bold mb-1">MANAGER</div>
                    <div class="text-[10px] text-slate-300">admin</div>
                </div>
                <div class="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700 cursor-pointer hover:bg-slate-700/50 transition-colors"
                     (click)="fillCredentials('staff', 'staff123')">
                    <div class="text-xs text-emerald-400 font-bold mb-1">STAFF</div>
                    <div class="text-[10px] text-slate-300">staff</div>
                </div>
                <div class="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700 cursor-pointer hover:bg-slate-700/50 transition-colors"
                     (click)="fillCredentials('tech', 'tech123')">
                    <div class="text-xs text-amber-400 font-bold mb-1">TECH</div>
                    <div class="text-[10px] text-slate-300">tech</div>
                </div>
            </div>
          </div>
        </div>
        
        <p class="text-center text-slate-500 text-xs mt-8">
          &copy; 2024 StaySyncOS. Copyright Jason Ruiz at JruizDesign.
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
  
  username = '';
  password = '';
  error = signal(false);

  fillCredentials(u: string, p: string) {
      this.username = u;
      this.password = p;
  }

  onLogin(e: Event) {
    e.preventDefault();
    if (!this.auth.login(this.username, this.password)) {
      this.error.set(true);
      // Reset error animation helper
      setTimeout(() => this.error.set(false), 3000);
    }
  }
}