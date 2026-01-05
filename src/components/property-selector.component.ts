import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

@Component({
    selector: 'app-property-selector',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600 blur-[100px]"></div>
         <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600 blur-[100px]"></div>
      </div>

      <div class="w-full max-w-2xl p-8 relative z-10 animate-fade-in">
        <!-- Brand -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-900/50 mb-4">
             <span class="text-3xl font-bold text-white">S</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <h1 class="text-3xl font-bold text-white tracking-tight">Select Property</h1>
            <button (click)="refreshList()" [disabled]="loading()" class="p-2 text-slate-500 hover:text-white transition-colors" title="Reload properties">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" [class.animate-spin]="loading()">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>
          </div>
          <p class="text-slate-400 mt-2">
            {{ data.userProfile()?.role === 'SuperAdmin' || auth.currentUser()?.role === 'SuperAdmin' ? 'Global Property Access' : 'Choose a hotel to manage' }}
          </p>
        </div>

        <!-- Property List -->
        <div class="grid gap-4">
            @if (loading()) {
                <div class="text-center text-slate-400 py-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                    <div class="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    Loading properties...
                </div>
            } @else {
                @for (hotel of hotels(); track hotel.id) {
                    <div class="relative">
                        <button (click)="selectHotel(hotel.id)" 
                            class="group relative w-full text-left bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/20 hover:-translate-y-1">
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{{ hotel.name || 'Unnamed Hotel' }}</h3>
                                        <p class="text-slate-400 text-sm flex items-center gap-2">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {{ hotel.address || 'No address set' }}
                                        </p>
                                    </div>
                                </div>
                                
                                <svg class="w-6 h-6 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </button>

                        <!-- SuperAdmin Delete Button -->
                        @if (data.userProfile()?.role === 'SuperAdmin' || auth.currentUser()?.role === 'SuperAdmin') {
                            <button (click)="confirmDelete($event, hotel)" 
                                class="absolute top-4 right-14 p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all z-20"
                                title="Delete Property">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        }
                    </div>
                }
            }

            @if (!loading() && hotels().length === 0) {
                <div class="text-center py-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                    <p class="text-slate-400 mb-6 font-medium">No properties found in the database.</p>
                    <button (click)="createDemoHotel()" 
                        class="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-105 active:scale-95">
                        Create Initial Property
                    </button>
                </div>
            }
        </div>
        
        <p class="text-center text-slate-500 text-xs mt-8">
          Logged in as {{ data.userProfile()?.email }}
        </p>

        <div class="text-center mt-6">
            <button (click)="logout()" class="text-slate-400 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Logout & Switch Account
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
export class PropertySelectorComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    router = inject(Router);

    hotels = computed(() => {
        const profile = this.data.userProfile() as any;
        const user = this.auth.currentUser();
        if (!user || profile === null) return [];

        const isAdmin = profile?.role === 'SuperAdmin' ||
            user?.role === 'SuperAdmin' ||
            user?.email === 'jruizdesign@gmail.com';

        if (isAdmin) {
            return this.data.allHotelsQuery.data()?.hotels || [];
        } else {
            const data = this.data.hotelsByUserQuery.data();
            return data?.user?.userHotels_on_user?.map(uh => uh.hotel) || [];
        }
    });

    loading = computed(() => {
        const profilePre = this.data.userProfile();
        if (profilePre === null) return true; // Waiting for profile

        const profile = profilePre as any;
        const user = this.auth.currentUser();
        if (!user) return false;

        const isAdmin = profile?.role === 'SuperAdmin' ||
            user?.role === 'SuperAdmin' ||
            user?.email === 'jruizdesign@gmail.com';

        if (isAdmin) {
            return this.data.allHotelsQuery.isFetching();
        } else {
            return this.data.hotelsByUserQuery.isFetching();
        }
    });

    constructor() {
        // Automatically redirect if only one hotel is available and we're not an admin
        effect(() => {
            const h = this.hotels();
            const l = this.loading();
            const profile = this.data.userProfile() as any;

            if (!l && h.length === 1 && profile?.role !== 'SuperAdmin') {
                console.log('[PropertySelector] Auto-selecting single property:', h[0].id);
                this.selectHotel(h[0].id);
            }

            if (!l && h.length === 0 && profile && profile.role !== 'SuperAdmin') {
                console.log('[PropertySelector] No properties found for user, redirecting to setup');
                this.router.navigate(['/setup']);
            }
        });
    }

    async refreshList() {
        const profile = this.data.userProfile() as any;
        const user = this.auth.currentUser();
        const isAdmin = profile?.role === 'SuperAdmin' ||
            user?.role === 'SuperAdmin' ||
            user?.email === 'jruizdesign@gmail.com';

        console.log('[PropertySelector] Refresh requested. IsAdmin:', isAdmin);

        if (isAdmin) {
            await this.loadAllHotels();
        } else {
            // Non-admins only refresh their assigned hotels
            const ids = profile?.hotelIds || (profile?.hotelId ? [profile.hotelId] : []);
            await this.loadHotels(ids);
        }
    }

    async loadAllHotels() {
        await this.data.allHotelsQuery.refetch();
    }

    async loadHotels(ids: string[]) {
        await this.data.hotelsByUserQuery.refetch();
    }

    async createDemoHotel() {
        this.loading.set(true);
        try {
            console.log('[PropertySelector] Creating initial property...');
            const newId = await this.data.createHotelForUser('StaySync Grand Hotel', '777 Broadway, New York, NY', 'PROP-001');
            console.log('[PropertySelector] Created hotel ID:', newId);
            await this.loadAllHotels();
        } catch (err) {
            console.error('[PropertySelector] Failed to create demo hotel', err);
        } finally {
            this.loading.set(false);
        }
    }

    selectHotel(id: string) {
        console.log('[PropertySelector] Selecting hotel:', id);
        this.data.selectedHotelId.set(id);
        this.router.navigate(['/dashboard']);
    }

    async confirmDelete(event: MouseEvent, hotel: any) {
        event.stopPropagation(); // Prevent selecting the hotel
        if (confirm(`Are you sure you want to delete "${hotel.name}"? This action cannot be undone.`)) {
            this.loading.set(true);
            try {
                await this.data.deleteHotel(hotel.id);
                console.log('[PropertySelector] Deleted hotel:', hotel.id);
                await this.loadAllHotels();
            } catch (err) {
                console.error('[PropertySelector] Failed to delete hotel', err);
                alert('Failed to delete hotel. Please try again.');
            } finally {
                this.loading.set(false);
            }
        }
    }

    async logout() {
        await this.auth.logout();
    }
}
