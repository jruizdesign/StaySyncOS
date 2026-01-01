import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Guest, FinancialDocument, Room } from '../services/data.service';
import { AiService } from '../services/ai.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { DocumentViewerComponent } from './document-viewer.component';

@Component({
    selector: 'app-guest-manager',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DocumentViewerComponent, FormsModule],
    template: `
    <div class="p-6 h-full flex flex-col">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
           <h1 class="text-2xl font-bold text-gray-800">Guests & Reservations</h1>
           <p class="text-sm text-gray-500">Manage profiles, bookings, and guest history</p>
        </div>
        <div class="flex gap-2 w-full md:w-auto">
             <button (click)="openBookingModal()" class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-sm font-medium">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Book Stay
             </button>
             <button (click)="openAddGuestModal()" class="flex-1 md:flex-none bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium">
                + New Profile
             </button>
        </div>
      </div>

      <!-- Guest Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div class="overflow-y-auto flex-1">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead class="bg-gray-50 text-gray-500 text-sm sticky top-0 z-10 shadow-sm">
              <tr>
                <th class="p-4 font-medium">Name</th>
                <th class="p-4 font-medium">Contact</th>
                <th class="p-4 font-medium">Status</th>
                <th class="p-4 font-medium">History</th>
                <th class="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              @for (guest of data.guests(); track guest.id) {
                <tr class="hover:bg-indigo-50/50 transition-colors cursor-pointer group" (click)="viewGuestDetails(guest)">
                  <td class="p-4">
                     <div class="font-bold text-gray-900">{{ guest.name }}</div>
                     <div class="text-xs text-gray-400 group-hover:text-indigo-500 transition-colors">Click to view details</div>
                  </td>
                  <td class="p-4 text-gray-600">
                    <div class="flex flex-col">
                      <span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> {{ guest.email }}</span>
                      <span class="text-xs text-gray-400 mt-0.5">{{ guest.phone }}</span>
                    </div>
                  </td>
                  <td class="p-4">
                    @if (guest.currentStayId) {
                      <span class="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">Checked In</span>
                    } @else {
                      <span class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">Inactive</span>
                    }
                  </td>
                  <td class="p-4 text-gray-600">{{ guest.history.length }} past stays</td>
                  <td class="p-4 text-right flex justify-end items-center gap-2" (click)="$event.stopPropagation()">
                    @if (!guest.currentStayId) {
                       <button (click)="openBookingModal(guest)" class="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded transition-colors text-xs font-semibold border border-transparent hover:border-indigo-100">Book Now</button>
                    } @else {
                       <button (click)="checkOut(guest)" class="text-rose-600 hover:bg-rose-50 px-3 py-1 rounded transition-colors text-xs font-semibold border border-transparent hover:border-rose-100">Check Out</button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Guest Modal (Simple) -->
      @if (showAddModal()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 class="font-bold text-gray-800">New Guest Profile</h3>
              <button (click)="showAddModal.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form [formGroup]="guestForm" (ngSubmit)="saveGuest()" class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input formControlName="name" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input formControlName="email" type="email" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input formControlName="phone" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div class="flex justify-end pt-2 gap-3">
                <button type="button" (click)="showAddModal.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" [disabled]="guestForm.invalid" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Detailed Guest Modal -->
      @if (selectedGuest()) {
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" (click)="selectedGuest.set(null)">
             <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fade-in h-[80vh] flex flex-col" (click)="$event.stopPropagation()">
                 <!-- Modal Header -->
                 <div class="p-6 border-b border-gray-100 flex justify-between items-start bg-slate-50">
                     <div class="flex items-center gap-4">
                         <div class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">
                             {{ selectedGuest()?.name?.charAt(0) }}
                         </div>
                         <div>
                             <h2 class="text-2xl font-bold text-gray-800">{{ selectedGuest()?.name }}</h2>
                             <div class="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                 <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> {{ selectedGuest()?.email }}</span>
                                 <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> {{ selectedGuest()?.phone }}</span>
                             </div>
                         </div>
                     </div>
                     <button (click)="selectedGuest.set(null)" class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                     </button>
                 </div>

                 <div class="flex-1 overflow-hidden flex flex-col md:flex-row">
                     <!-- Left Panel: Info & Actions -->
                     <div class="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
                         <div class="mb-6">
                             <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Status</h3>
                             @if (selectedGuest()?.currentStayId) {
                                 <div class="bg-emerald-100 border border-emerald-200 rounded-lg p-4 mb-2">
                                     <div class="text-emerald-800 font-bold flex items-center gap-2">
                                         <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Currently Checked In
                                     </div>
                                     <div class="text-sm text-emerald-700 mt-1">Room {{ getRoomNumber(selectedGuest()?.currentStayId) }}</div>
                                 </div>
                                 <button (click)="checkOut(selectedGuest()!)" class="w-full py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg font-medium text-sm mb-2 shadow-sm">Check Out Now</button>
                             } @else {
                                 <div class="text-gray-500 text-sm mb-4">Not currently staying.</div>
                                 <button (click)="openBookingModal(selectedGuest()!)" class="w-full py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium text-sm shadow-sm">Book New Stay</button>
                             }
                         </div>

                         <div class="mb-6">
                             <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Notes</h3>
                             <div class="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-600 min-h-[100px] italic">
                                 {{ selectedGuest()?.notes || 'No notes on file.' }}
                             </div>
                         </div>
                     </div>

                     <!-- Right Panel: Tabs (Docs & History) -->
                     <div class="flex-1 bg-white flex flex-col overflow-hidden">
                         <div class="flex border-b border-gray-100">
                             <button class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"
                                [class.border-indigo-500]="activeTab() === 'docs'" [class.text-indigo-600]="activeTab() === 'docs'"
                                [class.border-transparent]="activeTab() !== 'docs'" [class.text-gray-500]="activeTab() !== 'docs'"
                                (click)="activeTab.set('docs')">
                                Documents ({{ getGuestDocs(selectedGuest()!.id).length }})
                             </button>
                             <button class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"
                                [class.border-indigo-500]="activeTab() === 'history'" [class.text-indigo-600]="activeTab() === 'history'"
                                [class.border-transparent]="activeTab() !== 'history'" [class.text-gray-500]="activeTab() !== 'history'"
                                (click)="activeTab.set('history')">
                                Stay History
                             </button>
                         </div>

                         <div class="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                             @if (activeTab() === 'docs') {
                                 <div class="space-y-2">
                                     @for (doc of getGuestDocs(selectedGuest()!.id); track doc.id) {
                                         <div (click)="viewDocument(doc)" class="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm cursor-pointer transition-all flex justify-between items-center group">
                                             <div class="flex items-center gap-3">
                                                 <div class="p-2 bg-gray-100 rounded text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                                 </div>
                                                 <div>
                                                     <div class="font-medium text-gray-800">{{ doc.type }} #{{ doc.number }}</div>
                                                     <div class="text-xs text-gray-500">{{ doc.date | date:'mediumDate' }} • \${{ doc.totalAmount | number }}</div>
                                                 </div>
                                             </div>
                                             <svg class="w-5 h-5 text-gray-300 group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                         </div>
                                     } @empty {
                                         <div class="text-center py-12 text-gray-400">No documents found for this guest.</div>
                                     }
                                 </div>
                             } @else {
                                 <div class="space-y-4">
                                     @for (stay of selectedGuest()?.history; track stay.id) {
                                         <div class="bg-white p-4 rounded-lg border border-gray-200">
                                            <div class="flex justify-between items-start mb-2">
                                                <span class="font-bold text-gray-700">Room {{ getRoomNumberByStay(stay) }}</span>
                                                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Completed</span>
                                            </div>
                                            <div class="text-sm text-gray-600 grid grid-cols-2 gap-2">
                                                <div><span class="text-gray-400 text-xs">Check In:</span><br>{{ stay.checkIn | date:'mediumDate' }}</div>
                                                <div><span class="text-gray-400 text-xs">Check Out:</span><br>{{ stay.checkOutActual | date:'mediumDate' }}</div>
                                            </div>
                                            <div class="mt-2 pt-2 border-t border-gray-50 text-right text-sm font-medium text-gray-800">
                                                Total Paid: \${{ stay.totalPaid }}
                                            </div>
                                         </div>
                                     } @empty {
                                         <div class="text-center py-12 text-gray-400">No past stay history.</div>
                                     }
                                 </div>
                             }
                         </div>
                     </div>
                 </div>
             </div>
          </div>
      }

      <!-- BOOKING MODAL -->
      @if (showBookingModal()) {
         <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
               <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 class="font-bold text-gray-800 text-lg">New Booking</h3>
                  <button (click)="showBookingModal.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
               </div>
               
               <form [formGroup]="bookingForm" (ngSubmit)="submitBooking()" class="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  <!-- Guest Selection -->
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Guest</label>
                      @if (preSelectedGuest()) {
                          <div class="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900">
                              <span class="font-bold">{{ preSelectedGuest()?.name }}</span>
                              <button type="button" (click)="clearPreSelectedGuest()" class="text-xs text-indigo-500 hover:text-indigo-700 underline">Change</button>
                          </div>
                      } @else {
                          <select formControlName="guestId" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                              <option value="" disabled>Select a Guest...</option>
                              @for (g of data.guests(); track g.id) {
                                  <option [value]="g.id">{{ g.name }} ({{ g.email }})</option>
                              }
                          </select>
                          <div class="mt-2 text-right">
                              <button type="button" (click)="showBookingModal.set(false); showAddModal.set(true)" class="text-xs text-indigo-600 hover:underline">+ Create New Guest Profile</button>
                          </div>
                      }
                  </div>

                  <!-- Room Selection -->
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
                      <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1 border border-gray-200 rounded-lg bg-gray-50">
                          @for (room of availableRooms(); track room.id) {
                              <label class="cursor-pointer border rounded-md p-2 flex flex-col gap-1 transition-all hover:border-indigo-400"
                                [class.bg-white]="bookingForm.get('roomId')?.value !== room.id"
                                [class.bg-indigo-50]="bookingForm.get('roomId')?.value === room.id"
                                [class.border-indigo-500]="bookingForm.get('roomId')?.value === room.id"
                                [class.ring-1]="bookingForm.get('roomId')?.value === room.id"
                                [class.ring-indigo-500]="bookingForm.get('roomId')?.value === room.id">
                                  <div class="flex items-center gap-2">
                                      <input type="radio" formControlName="roomId" [value]="room.id" class="hidden">
                                      <span class="font-bold text-gray-800">Room {{ room.number }}</span>
                                  </div>
                                  <div class="text-xs text-gray-500 flex justify-between">
                                      <span>{{ room.type }}</span>
                                      <span class="font-medium text-emerald-600">\${{ room.price }}</span>
                                  </div>
                              </label>
                          } @empty {
                              <div class="col-span-2 text-center py-4 text-gray-500 text-sm">No available rooms found.</div>
                          }
                      </div>
                  </div>

                  <!-- Dates -->
                  <div class="grid grid-cols-2 gap-4">
                      <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                          <input formControlName="checkIn" type="date" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                      </div>
                      <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                          <input formControlName="checkOut" type="date" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                            [attr.disabled]="isIndefinite() ? true : null"
                            [class.bg-gray-100]="isIndefinite()"
                            [class.text-gray-400]="isIndefinite()">
                      </div>
                  </div>

                  <!-- Indefinite Option -->
                  <div class="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                      <input type="checkbox" formControlName="isIndefinite" id="indefinite" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      <div>
                          <label for="indefinite" class="text-sm font-medium text-gray-800 cursor-pointer">Indefinite Stay</label>
                          <p class="text-xs text-gray-500">Check-out date will be open-ended.</p>
                      </div>
                  </div>

               </form>

               <div class="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                   <button (click)="showBookingModal.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                   <button (click)="submitBooking()" [disabled]="bookingForm.invalid" class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold shadow-sm disabled:opacity-50 transition-all">
                       Confirm Booking
                   </button>
               </div>
            </div>
         </div>
      }

      <!-- Document Viewer -->
      @if (viewDoc()) {
          <app-document-viewer [document]="viewDoc()!" (close)="viewDoc.set(null)"></app-document-viewer>
      }

      <!-- Receipt Viewer for actions -->
      @if (createdDoc()) {
          <app-document-viewer [document]="createdDoc()!" (close)="createdDoc.set(null)"></app-document-viewer>
      }
    </div>
  `
})
export class GuestManagerComponent {
    data = inject(DataService);
    ai = inject(AiService);
    fb = inject(FormBuilder);

    // States
    showAddModal = signal(false);
    showBookingModal = signal(false);
    selectedGuest = signal<Guest | null>(null);
    activeTab = signal<'docs' | 'history'>('docs');
    viewDoc = signal<FinancialDocument | null>(null);

    // Helpers
    createdDoc = signal<FinancialDocument | null>(null);
    preSelectedGuest = signal<Guest | null>(null);

    // Forms
    guestForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
    });

    bookingForm: FormGroup;

    constructor() {
        // Booking Form Init
        const today = new Date().toISOString().split('T')[0];
        this.bookingForm = this.fb.group({
            guestId: ['', Validators.required],
            roomId: ['', Validators.required],
            checkIn: [today, Validators.required],
            checkOut: [''],
            isIndefinite: [false]
        });

        // Validations
        // If not indefinite, checkOut is required
        this.bookingForm.get('isIndefinite')?.valueChanges.subscribe(val => {
            const co = this.bookingForm.get('checkOut');
            if (val) {
                co?.clearValidators();
                co?.setValue('');
                co?.disable();
            } else {
                co?.setValidators([Validators.required]);
                co?.enable();
            }
            co?.updateValueAndValidity();
        });
    }

    // --- Computed ---
    availableRooms = computed(() => this.data.rooms().filter(r => r.status === 'Available'));
    isIndefinite = computed(() => this.bookingForm.get('isIndefinite')?.value);

    // --- Guest Actions ---
    saveGuest() {
        if (this.guestForm.valid) {
            const val = this.guestForm.value;
            const newGuest = {
                name: val.name!,
                email: val.email!,
                phone: val.phone!,
                history: [],
                notes: '',
                currentStayId: null
            };

            this.data.addGuest(newGuest);
            this.data.log('Guest', 'Guest Registered', `New profile: ${newGuest.name}`);
            this.showAddModal.set(false);
            this.guestForm.reset();
        }
    }

    viewGuestDetails(guest: Guest) {
        this.selectedGuest.set(guest);
        this.activeTab.set('docs');
    }

    getGuestDocs(guestId: string) {
        return this.data.documents().filter(d => d.guestId === guestId);
    }

    getRoomNumber(stayId?: string | null) {
        if (!stayId) return 'Unknown';
        const stay = this.data.stays().find(s => s.id === stayId);
        const room = this.data.rooms().find(r => r.id === stay?.roomId);
        return room?.number || 'Unknown';
    }

    getRoomNumberByStay(stay: any) {
        // For history items, roomId is stored in stay object
        const room = this.data.rooms().find(r => r.id === stay.roomId);
        return room ? room.number : 'Unknown'; // Might be deleted room, etc.
    }

    viewDocument(doc: FinancialDocument) {
        this.viewDoc.set(doc);
    }

    // --- Booking Actions ---
    openBookingModal(guest?: Guest) {
        this.selectedGuest.set(null); // Close detail view if open to focus on booking
        this.showBookingModal.set(true);
        this.bookingForm.reset({
            checkIn: new Date().toISOString().split('T')[0],
            isIndefinite: false
        });

        if (guest) {
            this.preSelectedGuest.set(guest);
            this.bookingForm.patchValue({ guestId: guest.id });
            this.bookingForm.get('guestId')?.disable();
        } else {
            this.preSelectedGuest.set(null);
            this.bookingForm.get('guestId')?.enable();
        }
    }

    openAddGuestModal() {
        this.showAddModal.set(true);
    }

    clearPreSelectedGuest() {
        this.preSelectedGuest.set(null);
        this.bookingForm.get('guestId')?.enable();
        this.bookingForm.get('guestId')?.setValue('');
    }

    submitBooking() {
        // Re-enable to get value if disabled
        this.bookingForm.get('guestId')?.enable();

        if (this.bookingForm.valid) {
            const val = this.bookingForm.value;
            const guest = this.data.guests().find(g => g.id === val.guestId);

            if (guest) {
                this.data.bookStay(
                    guest,
                    val.roomId,
                    val.checkIn,
                    val.isIndefinite ? undefined : val.checkOut
                );

                this.showBookingModal.set(false);

                // Show the invoice generated
                const latestDoc = this.data.documents()[0];
                if (latestDoc) this.createdDoc.set(latestDoc);
            }
        }
    }

    checkOut(guest: Guest) {
        if (confirm(`Are you sure you want to check out ${guest.name}? This will generate the final invoice/receipt.`)) {
            if (guest.currentStayId) {
                this.data.checkOut(guest.currentStayId);
                const latestDoc = this.data.documents()[0];
                if (latestDoc) this.createdDoc.set(latestDoc);

                // If details view was open, refresh it (close and reopen logic handled by reactivity generally, 
                // but let's just close it to be safe or update local ref if needed. 
                // Since signals are reactive, selectedGuest() will update automatically with new data from service.)
            }
        }
    }
}