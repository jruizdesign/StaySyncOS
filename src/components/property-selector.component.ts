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
            <button (click)="loadAllHotels()" [disabled]="loading()" class="p-2 text-slate-500 hover:text-white transition-colors" title="Reload properties">
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

    hotels = signal<any[]>([]);
    loading = signal(true);

    constructor() {
        effect(() => {
            const profile = this.data.userProfile() as any;
            const user = this.auth.currentUser();

            console.log('[PropertySelector] Debug Info:', {
                hasUser: !!user,
                userEmail: user?.email,
                hasProfile: !!profile,
                profileRole: profile?.role
            });

            if (this.loading() && this.hotels().length > 0) return; // Already have data
            if (!user) {
                this.loading.set(false);
                return;
            }

            // 1. Unified Admin Check (Role OR Email Fallback)
            const isAdmin = profile?.role === 'SuperAdmin' || user.email === 'jruizdesign@gmail.com';

            if (isAdmin) {
                console.log('[PropertySelector] SuperAdmin/Admin detected. Fetching global list...');
                this.loadAllHotels();
                return;
            }

            // 2. Regular User logic
            if (profile && profile['hotelIds'] && Array.isArray(profile['hotelIds']) && profile['hotelIds'].length > 0) {
                this.loadHotels(profile['hotelIds']);
            } else if (profile && profile['hotelId']) {
                console.log('[PropertySelector] Auto-selecting assigned hotel:', profile['hotelId']);
                this.selectHotel(profile['hotelId']);
            } else if (profile !== null) {
                this.loading.set(false);
                this.router.navigate(['/setup']);
            }
        });
    }

    async loadAllHotels() {
        this.loading.set(true);
        try {
            console.log('[PropertySelector] Loading all hotels via Data Connect...');
            const res = await this.data.allHotelsQuery.execute();
            console.log('[PropertySelector] All hotels result:', res.data.hotels);
            this.hotels.set(res.data.hotels || []);
        } catch (err) {
            console.error('[PropertySelector] Failed to load all hotels', err);
        } finally {
            this.loading.set(false);
        }
    }

    async loadHotels(ids: string[]) {
        this.loading.set(true);
        try {
            const user = this.auth.currentUser();
            if (user?.id) {
                const res = await this.data.hotelsByUserQuery.execute({ userId: user.id });
                const hotelsViaUser = res.data.user?.userHotels_on_user?.map(uh => uh.hotel) || [];

                if (hotelsViaUser.length) {
                    this.hotels.set(hotelsViaUser);
                    return;
                }
            }

            // Fallback for transition or if user-hotel link is only in Firestore
            const promises = ids.map(id => getDoc(doc(this.data.firestore, `hotels/${id}`)));
            const snapshots = await Promise.all(promises);
            const loaded = snapshots
                .filter(snap => snap.exists())
                .map(snap => ({ id: snap.id, ...snap.data() }));

            this.hotels.set(loaded);
        } catch (err) {
            console.error('Failed to load hotels', err);
        } finally {
            this.loading.set(false);
        }
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

    async logout() {
        await this.auth.logout();
    }
}
