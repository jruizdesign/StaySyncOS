import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div class="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600 blur-[100px]"></div>
         <div class="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600 blur-[100px]"></div>
      </div>

      <div class="w-full max-w-lg p-8 relative z-10 animate-fade-in">
        <!-- Brand -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/50 mb-4">
             <span class="text-3xl font-bold text-white">S</span>
          </div>
          <h1 class="text-3xl font-bold text-white tracking-tight">System Setup</h1>
          <p class="text-slate-400 mt-2">Initialize your property details to get started.</p>
        </div>

        <!-- Recovery / Link Existing -->
        @if (existingHotel()) {
          <div class="bg-indigo-600/20 border border-indigo-500/50 rounded-2xl p-6 mb-8 text-center animate-fade-in">
             <div class="text-indigo-300 font-medium mb-2">We found an existing hotel</div>
             <div class="text-white text-xl font-bold mb-4">{{ existingHotel().name }}</div>
             <p class="text-indigo-200/80 text-sm mb-6">Is this your property? You can link your account to it immediately.</p>
             <button (click)="linkExisting()" [disabled]="loading()" 
                class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-900/50 transition-all">
                {{ loading() ? 'Linking...' : 'Yes, Access Dashboard' }}
             </button>
          </div>
          
          <div class="relative flex py-5 items-center">
              <div class="flex-grow border-t border-slate-700"></div>
              <span class="flex-shrink-0 mx-4 text-slate-500 text-sm">Or create new</span>
              <div class="flex-grow border-t border-slate-700"></div>
          </div>
        }

        <!-- Setup Card -->
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form (submit)="onSubmit($event)" class="space-y-6">
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Hotel Name</label>
              <input [(ngModel)]="name" name="name" type="text" 
                class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="e.g. Grand Plaza Hotel" required>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Address</label>
              <input [(ngModel)]="address" name="address" type="text"
                class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="Full address" required>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Property ID</label>
              <input [(ngModel)]="propertyId" name="propertyId" type="text"
                class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="e.g. PROP-001" required>
            </div>

            @if (error()) {
              <div class="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm text-center">
                {{ errorMessage() }}
              </div>
            }

            <button type="submit" [disabled]="loading()"
              class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-lg shadow-emerald-900/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              {{ loading() ? 'Initializing System...' : 'Complete Setup' }}
            </button>
            
          </form>
        </div>
        
        <p class="text-center text-slate-500 text-xs mt-8">
          Initial configuration for admin access.
        </p>
        
        <div class="text-center mt-4">
          <button (click)="logout()" class="text-slate-400 hover:text-white text-sm underline">
            Wrong account? Logout
          </button>
        </div>
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
export class SetupComponent {
  data = inject(DataService);
  router = inject(Router);
  auth = inject(AuthService); // Inject Auth Service

  name = 'StaySyncOS Hotel';
  address = '';
  propertyId = 'PROP-' + Math.floor(Math.random() * 1000);

  loading = signal(false);
  error = signal(false);
  errorMessage = signal('');

  // Signal for recovery mode
  existingHotel = signal<any>(null);

  constructor() {
    // If hotel already exists, redirect away
    effect(() => {
      const hotel = this.data.currentHotelQuery.data()?.hotel;
      if (hotel) {
        this.router.navigate(['/dashboard']);
      }
    });

    // Check for an existing hotel globally (Account Recovery)
    effect(() => {
      const hotels = this.data.firstHotelQuery.data()?.hotels;
      if (hotels && hotels.length > 0) {
        console.log('[SetupComponent] Found existing hotel:', hotels[0]);
        this.existingHotel.set(hotels[0]);
      }
    });
  }

  async linkExisting() {
    const h = this.existingHotel();
    if (!h) return;

    this.loading.set(true);
    try {
      await this.data.linkHotelToUser(h.id);
      // Wait for propagation
      setTimeout(() => this.router.navigate(['/dashboard']), 500);
    } catch (e: any) {
      this.error.set(true);
      this.errorMessage.set(e.message);
      this.loading.set(false);
    }
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if (!this.name || !this.address || !this.propertyId) return;

    this.loading.set(true);
    this.error.set(false);

    try {
      const newId = await this.data.createHotelForUser(this.name, this.address, this.propertyId);

      if (newId) {
        // Wait for the Signal to propagate the new Hotel ID
        // We can check data.currentHotelId() or just wait a bit
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        throw new Error("Failed to link hotel to user.");
      }

    } catch (err: any) {
      this.error.set(true);
      this.errorMessage.set(err.message || "Failed to create hotel record.");
      this.loading.set(false);
    }
  }
  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
