import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DataService, Room, Guest, Stay } from '../services/data.service';

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6 h-full flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Room Management</h1>
          <p class="text-gray-500 text-sm">Configure hotel inventory</p>
        </div>
        <button (click)="toggleWizard()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors">
          {{ showWizard() ? 'Cancel Creation' : '+ New Room' }}
        </button>
      </div>

      <!-- Room Wizard -->
      @if (showWizard()) {
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8 animate-slide-down">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-800">Create New Room</h2>
            <div class="flex gap-2">
               <span class="text-xs font-bold px-2 py-1 rounded" [class.bg-indigo-100]="step() === 1" [class.text-indigo-700]="step() === 1">1. Basics</span>
               <span class="text-xs font-bold px-2 py-1 rounded" [class.bg-indigo-100]="step() === 2" [class.text-indigo-700]="step() === 2">2. Details</span>
               <span class="text-xs font-bold px-2 py-1 rounded" [class.bg-indigo-100]="step() === 3" [class.text-indigo-700]="step() === 3">3. Review</span>
            </div>
          </div>

          <form [formGroup]="roomForm" (ngSubmit)="submitRoom()">
            @switch (step()) {
              @case (1) {
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                    <input formControlName="roomNumber" type="text" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 404">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                    <input type="number" class="w-full border border-gray-300 rounded-lg p-2 outline-none" placeholder="e.g. 4">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Base Price ($/night)</label>
                    <input formControlName="dailyRate" type="number" class="w-full border border-gray-300 rounded-lg p-2 outline-none" placeholder="0.00">
                  </div>
                </div>
              }
              @case (2) {
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                    <select formControlName="roomType" class="w-full border border-gray-300 rounded-lg p-2 outline-none bg-white">
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Suite">Suite</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>
                  <div>
                     <label class="block text-sm font-medium text-gray-700 mb-1">Amenities (Comma separated)</label>
                     <input type="text" class="w-full border border-gray-300 rounded-lg p-2 outline-none" placeholder="Wifi, TV, Balcony...">
                  </div>
                </div>
              }
              @case (3) {
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 class="font-medium text-gray-900 mb-2">Summary</h3>
                  <p class="text-sm text-gray-600">Room: <span class="font-semibold">{{ roomForm.get('roomNumber')?.value }}</span></p>
                  <p class="text-sm text-gray-600">Type: <span class="font-semibold">{{ roomForm.get('roomType')?.value }}</span></p>
                  <p class="text-sm text-gray-600">Price: <span class="font-semibold">\${{ roomForm.get('dailyRate')?.value }}</span></p>
                </div>
              }
            }

            <div class="flex justify-end gap-3 mt-6">
              @if (step() > 1) {
                <button type="button" (click)="prevStep()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Back</button>
              }
              @if (step() < 3) {
                <button type="button" (click)="nextStep()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Next</button>
              }
              @if (step() === 3) {
                <button type="submit" [disabled]="roomForm.invalid" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50">Create Room</button>
              }
            </div>
          </form>
        </div>
      }

      <!-- Loading State -->
      @if (data.roomsLoading()) {
        <div class="flex justify-center items-center h-64 text-gray-500">
          <svg class="animate-spin h-8 w-8 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading rooms...</span>
        </div>
      }

      <!-- Room Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
        @for (room of data.rooms(); track room.id) {
          <div class="bg-white p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow relative cursor-pointer"
            (click)="handleRoomClick(room)"
            [class.border-l-emerald-500]="room.status === 'Available'"
            [class.border-l-rose-500]="room.status === 'Occupied'"
            [class.border-l-amber-500]="room.status === 'Maintenance'"
            [class.border-l-gray-500]="room.status === 'Dirty'">
            
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-gray-800">{{ room.roomNumber }}</h3>
              <span class="text-xs font-semibold px-2 py-1 rounded-full"
                [class.bg-emerald-100]="room.status === 'Available'" [class.text-emerald-700]="room.status === 'Available'"
                [class.bg-rose-100]="room.status === 'Occupied'" [class.text-rose-700]="room.status === 'Occupied'"
                [class.bg-amber-100]="room.status === 'Maintenance'" [class.text-amber-700]="room.status === 'Maintenance'"
                [class.bg-gray-100]="room.status === 'Dirty'" [class.text-gray-700]="room.status === 'Dirty'">
                {{ room.status }}
              </span>
            </div>
            
            <div class="text-sm text-gray-500 mb-4">{{ room.roomType }} • \${{ room.dailyRate }}/night</div>
            
            <div class="flex flex-wrap gap-1 mb-4 h-6 overflow-hidden">
            </div>

            <!-- Action / Status Update -->
            <div class="flex justify-between items-center mt-4 pt-3 border-t border-gray-100" (click)="$event.stopPropagation()">
               <div class="relative w-full mr-2">
                  <select 
                    [value]="room.status" 
                    (change)="updateStatus(room.id, $event)"
                    class="w-full appearance-none bg-transparent text-xs font-medium text-gray-500 hover:text-indigo-600 cursor-pointer outline-none py-1">
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Dirty">Dirty</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0 text-gray-500">
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
               </div>
               
               <button class="text-gray-400 hover:text-indigo-600">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
               </button>
            </div>
          </div>
        }
      </div>

      <!-- Guest Glance Modal -->
      @if (selectedGlance()) {
          <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" (click)="selectedGlance.set(null)">
              <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up" (click)="$event.stopPropagation()">
                  <!-- Header with Image Placeholder -->
                  <div class="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative p-4">
                      <button (click)="selectedGlance.set(null)" class="absolute top-4 right-4 text-white/80 hover:text-white">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                      <div class="absolute -bottom-8 left-6">
                           <div class="w-16 h-16 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                               {{ selectedGlance()?.guest?.name?.charAt(0) }}
                           </div>
                      </div>
                  </div>

                  <div class="pt-10 pb-6 px-6">
                      <h2 class="text-xl font-bold text-gray-800">{{ selectedGlance()?.guest?.name }}</h2>
                      <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                           <span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold">Room {{ selectedGlance()?.room?.roomNumber }}</span>
                           <span>•</span>
                           <span>{{ selectedGlance()?.guest?.email }}</span>
                      </div>
                      
                      <div class="grid grid-cols-2 gap-4 mb-6">
                          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <div class="text-xs text-gray-500 uppercase font-bold">Check In</div>
                              <div class="text-sm font-medium text-gray-900">{{ selectedGlance()?.stay?.checkIn | date:'MMM d' }}</div>
                          </div>
                          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <div class="text-xs text-gray-500 uppercase font-bold">Accrued Balance</div>
                              <div class="text-sm font-bold" [class.text-rose-600]="(selectedGlance()?.debt ?? 0) > 0" [class.text-emerald-600]="(selectedGlance()?.debt ?? 0) <= 0">
                                  \${{ selectedGlance()?.debt | number:'1.2-2' }}
                              </div>
                          </div>
                      </div>

                      @if (showFullDetails()) {
                          <div class="mb-6 space-y-2 text-sm border-t border-gray-100 pt-4 animate-slide-down">
                              <div class="flex justify-between">
                                  <span class="text-gray-500">Phone:</span>
                                  <span class="text-gray-800">{{ selectedGlance()?.guest?.phone }}</span>
                              </div>
                              <div class="flex justify-between">
                                  <span class="text-gray-500">Total Paid:</span>
                                  <span class="text-emerald-600">\${{ selectedGlance()?.stay?.totalPaid }}</span>
                              </div>
                              <div class="flex justify-between">
                                  <span class="text-gray-500">Expected Checkout:</span>
                                  <span class="text-gray-800">{{ selectedGlance()?.stay?.checkOutProjected | date:'mediumDate' }}</span>
                              </div>
                              <div class="mt-2">
                                  <span class="text-gray-500 block mb-1">Notes:</span>
                                  <p class="text-gray-700 bg-gray-50 p-2 rounded italic text-xs">"{{ selectedGlance()?.guest?.notes || 'No notes available' }}"</p>
                              </div>
                          </div>
                      }

                      <button (click)="toggleDetails()" class="w-full py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mb-2">
                          {{ showFullDetails() ? 'Hide Details' : 'View Full Profile' }}
                      </button>
                      
                  </div>
              </div>
          </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-down {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-down { animation: slide-down 0.3s ease-out; }
    
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slide-up 0.3s ease-out; }
  `]
})
export class RoomManagerComponent {
  data = inject(DataService);
  fb = inject(FormBuilder);

  showWizard = signal(false);
  step = signal(1);

  // Guest Glance State
  selectedGlance = signal<{ room: Room, guest?: Guest, stay?: Stay, debt?: number } | null>(null);
  showFullDetails = signal(false);

  roomForm: FormGroup = this.fb.group({
    roomNumber: ['', Validators.required],
    roomType: ['Single', Validators.required],
    dailyRate: [100, [Validators.required, Validators.min(0)]],
    amenities: ['']
  });

  toggleWizard() {
    this.showWizard.update(v => !v);
    this.step.set(1);
    this.roomForm.reset({ roomType: 'Single', dailyRate: 100 });
  }

  nextStep() {
    this.step.update(s => s + 1);
  }

  prevStep() {
    this.step.update(s => s - 1);
  }

  async submitRoom() {
    if (this.roomForm.invalid) return;

    const val = this.roomForm.value;
    await this.data.addRoom({
      roomNumber: val.roomNumber,
      roomType: val.roomType,
      dailyRate: val.dailyRate,
      capacity: 2 // Default since form doesn't have it
    } as any);

    this.toggleWizard();
    this.roomForm.reset({ roomType: 'Single', dailyRate: 100 });
  }

  async updateStatus(roomId: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    await this.data.updateRoomStatus(roomId, select.value);
  }

  handleRoomClick(room: Room) {
    if (room.status !== 'Occupied') return;

    // Find the active stay information
    const debtInfo = this.data.activeStaysWithDebt().find(item => item.room?.id === room.id);

    if (debtInfo) {
      this.showFullDetails.set(false);
      this.selectedGlance.set({
        room: room,
        guest: debtInfo.guest,
        stay: debtInfo.stay,
        debt: debtInfo.debt
      });
    } else {
      // Fallback if data sync is weird (shouldn't happen often)
      this.selectedGlance.set({ room: room });
    }
  }

  toggleDetails() {
    this.showFullDetails.update(v => !v);
  }
}