import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

    name = 'StaySyncOS Hotel';
    address = '';
    propertyId = 'PROP-' + Math.floor(Math.random() * 1000);

    loading = signal(false);
    error = signal(false);
    errorMessage = signal('');

    constructor() {
        // If hotel already exists, redirect away
        effect(() => {
            const hotel = this.data.firstHotelQuery.data()?.hotels?.[0];
            if (hotel) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    async onSubmit(e: Event) {
        e.preventDefault();
        if (!this.name || !this.address || !this.propertyId) return;

        this.loading.set(true);
        this.error.set(false);

        try {
            await this.data.createHotelMut.mutateAsync({
                name: this.name,
                address: this.address,
                propertyId: this.propertyId
            });

            // Let the effect handle the redirect, or do it manually
            // We might need to wait for query invalidation/update
            // But since we just mutated, let's give it a moment or rely on the signal update

            // Wait for a brief moment for the signal to potentially update if we want to be safe
            // But manual redirect is fine too.
            setTimeout(() => {
                this.router.navigate(['/dashboard']);
            }, 500);

        } catch (err: any) {
            this.error.set(true);
            this.errorMessage.set(err.message || "Failed to create hotel record.");
            this.loading.set(false);
        }
    }
}
