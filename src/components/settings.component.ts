import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DataService, HotelConfig, Room } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">System Settings</h1>
          <p class="text-gray-500 text-sm">Property configuration and data management</p>
        </div>
        <div class="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">
           Version 1.0.0
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Property Profile -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
             <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
             Property Profile
           </h2>
           <form [formGroup]="configForm" (ngSubmit)="updateConfig()" class="space-y-4">
              <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                 <input formControlName="name" type="text" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                 <input formControlName="address" type="text" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div class="grid grid-cols-2 gap-4">
                 <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input formControlName="email" type="email" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                 </div>
                 <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input formControlName="phone" type="text" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                 </div>
              </div>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div class="flex items-center gap-2">
                     <input type="checkbox" formControlName="demoMode" id="demoMode" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                     <label for="demoMode" class="text-sm font-medium text-gray-700">Demo / Training Mode</label>
                  </div>
                  <button type="submit" [disabled]="configForm.pristine" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 shadow-sm transition-all">
                      Save Changes
                  </button>
              </div>
           </form>
        </div>

        <!-- Data Management -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
           <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
             <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
             Backup & Restore
           </h2>
           <p class="text-sm text-gray-500 mb-6">Create comprehensive backups of your entire hotel database including guests, financial records, and staff logs.</p>
           
           <div class="space-y-4 flex-1">
              <button (click)="downloadBackup()" class="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-xl hover:bg-emerald-100 transition-colors">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                 <div class="text-left">
                    <div class="font-bold">Download System Backup</div>
                    <div class="text-xs opacity-75">JSON format • {{ (data.getExportData().length / 1024) | number:'1.1-2' }} KB</div>
                 </div>
              </button>

              <div class="relative w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 border border-slate-200 p-4 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                 <input type="file" (change)="triggerRestore($event)" accept=".json" class="absolute inset-0 opacity-0 cursor-pointer">
                 <svg class="w-6 h-6 text-slate-500 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                 <div class="text-left">
                    <div class="font-bold">Restore from File</div>
                    <div class="text-xs opacity-75">Drag & Drop or Click to Upload</div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-rose-50 rounded-xl shadow-sm border border-rose-200 p-6 lg:col-span-2">
           <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h2 class="text-lg font-bold text-rose-800 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    System Re-Initialization
                  </h2>
                  <p class="text-sm text-rose-700 mt-1">Permanently erase all data and reset the system. Used when setting up for a new property.</p>
               </div>
               
               <div class="flex items-center gap-3 bg-white p-2 rounded-lg border border-rose-100">
                  <div class="text-xs text-rose-600 font-medium px-2">
                      {{ hasBackedUp() ? 'Backup Verified' : 'Backup Required' }}
                  </div>
                  <button (click)="hardReset()" [disabled]="!hasBackedUp()" 
                    class="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg shadow-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                      {{ hasBackedUp() ? 'Re-Initialize System' : 'Download Backup First' }}
                  </button>
               </div>
           </div>
        </div>
      </div>

      <!-- Database Visualizer -->
      <div class="bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden text-slate-300">
         <div class="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <h2 class="font-bold font-mono text-sm text-indigo-400">System Database Visualizer</h2>
            <button (click)="showRaw.set(!showRaw())" class="text-xs border border-slate-700 hover:bg-slate-800 px-3 py-1 rounded text-slate-400 transition-colors">
                {{ showRaw() ? 'Hide Raw JSON' : 'Show Raw JSON' }}
            </button>
         </div>
         
         <div class="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
             <div>
                <div class="text-slate-500 uppercase text-xs font-bold mb-1">Total Rooms</div>
                <div class="text-2xl text-white">{{ data.rooms().length }}</div>
             </div>
             <div>
                <div class="text-slate-500 uppercase text-xs font-bold mb-1">Guest Profiles</div>
                <div class="text-2xl text-white">{{ data.guests().length }}</div>
             </div>
             <div>
                <div class="text-slate-500 uppercase text-xs font-bold mb-1">Financial Docs</div>
                <div class="text-2xl text-white">{{ data.documents().length }}</div>
             </div>
             <div>
                <div class="text-slate-500 uppercase text-xs font-bold mb-1">System Logs</div>
                <div class="text-2xl text-white">{{ data.logs().length }}</div>
             </div>
         </div>

         @if (showRaw()) {
            <div class="bg-black p-4 overflow-auto h-96 border-t border-slate-800">
                <pre class="font-mono text-xs text-emerald-400">{{ data.getExportData() }}</pre>
            </div>
         }
      </div>

      <!-- Bulk Room Creation Wizard -->
      @if (showBulkWizard()) {
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
                <div class="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">Room Setup Wizard</h2>
                        <p class="text-sm text-gray-500">Initialize your hotel inventory</p>
                    </div>
                </div>

                <div class="p-8 overflow-y-auto space-y-6 flex-1">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <h3 class="font-semibold text-indigo-900 mb-2">Structure</h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
                                    <input type="number" [(ngModel)]="wizFloors" min="1" max="20" class="w-full border border-gray-300 rounded-lg p-2.5">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Rooms per Floor</label>
                                    <input type="number" [(ngModel)]="wizRoomsPerFloor" min="1" max="50" class="w-full border border-gray-300 rounded-lg p-2.5">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Starting Floor #</label>
                                    <input type="number" [(ngModel)]="wizStartFloor" min="1" class="w-full border border-gray-300 rounded-lg p-2.5">
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                             <h3 class="font-semibold text-gray-900 mb-2">Defaults</h3>
                             <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                                    <select [(ngModel)]="wizDefaultType" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white">
                                        <option value="Single">Single</option>
                                        <option value="Double">Double</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Penthouse">Penthouse</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-2.5 text-gray-500">$</span>
                                        <input type="number" [(ngModel)]="wizDefaultPrice" class="w-full border border-gray-300 rounded-lg p-2.5 pl-7">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                                    <input type="text" [(ngModel)]="wizAmenities" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="Wifi, TV...">
                                </div>
                             </div>
                        </div>
                    </div>

                    <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm text-emerald-800 flex gap-2">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <p>
                            Preview: This will generate <strong>{{ wizFloors * wizRoomsPerFloor }}</strong> rooms. 
                            <br>Example: Room {{ (wizStartFloor * 100) + 1 }} to {{ ((wizStartFloor + wizFloors - 1) * 100) + wizRoomsPerFloor }}
                        </p>
                    </div>
                </div>

                <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button (click)="showBulkWizard.set(false)" class="px-5 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors">Skip Setup</button>
                    <button (click)="runBulkWizard()" class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold shadow-sm transition-all flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                        Generate Inventory
                    </button>
                </div>
            </div>
        </div>
      }

    </div>
  `
})
export class SettingsComponent {
  data = inject(DataService);
  auth = inject(AuthService);
  fb = inject(FormBuilder);

  configForm: FormGroup;
  hasBackedUp = signal(false);
  showRaw = signal(false);
  
  // Wizard State
  showBulkWizard = signal(false);
  wizFloors = 3;
  wizRoomsPerFloor = 10;
  wizStartFloor = 1;
  wizDefaultType: Room['type'] = 'Single';
  wizDefaultPrice = 120;
  wizAmenities = 'Wifi, TV, Mini-bar';

  constructor() {
    const config = this.data.hotelConfig();
    this.configForm = this.fb.group({
      name: [config.name, Validators.required],
      address: [config.address, Validators.required],
      email: [config.email, [Validators.required, Validators.email]],
      phone: [config.phone, Validators.required],
      demoMode: [config.demoMode]
    });
  }

  updateConfig() {
    if (this.configForm.valid) {
      const newConfig = this.configForm.value;
      const oldConfig = this.data.hotelConfig();

      // Handle Demo Mode Toggle Workflow
      if (newConfig.demoMode !== oldConfig.demoMode) {
         if (newConfig.demoMode) {
             // Enabling Demo Mode
             if (confirm("Enable Demo Mode? This will wipe your current data and load sample data.")) {
                 this.data.factoryReset(true);
             } else {
                 // Revert checkbox in UI if cancelled
                 this.configForm.patchValue({ demoMode: false });
                 return; 
             }
         } else {
             // Disabling Demo Mode (Going Real)
             if (confirm("Disable Demo Mode? This will WIPE ALL MOCK DATA to prepare for real usage.")) {
                 this.data.factoryReset(false); // Wipes data, sets demoMode=false in config internally
                 // We don't save the form immediately here because factoryReset handles the config signal
                 // But we want to trigger the wizard
                 this.showBulkWizard.set(true);
                 // We can return early as factoryReset updated the config signal already
                 return;
             } else {
                 // Revert
                 this.configForm.patchValue({ demoMode: true });
                 return;
             }
         }
      }

      this.data.updateHotelDetails(newConfig);
      this.configForm.markAsPristine();
      
      // Only alert if we didn't just switch modes (which has its own prompts)
      if (newConfig.demoMode === oldConfig.demoMode) {
          alert('Property profile updated successfully.');
      }
    }
  }

  runBulkWizard() {
      const roomsToAdd: Omit<Room, 'id' | 'status'>[] = [];
      const amenities = this.wizAmenities.split(',').map(s => s.trim()).filter(s => s.length > 0);

      for (let f = 0; f < this.wizFloors; f++) {
          const currentFloor = this.wizStartFloor + f;
          for (let r = 1; r <= this.wizRoomsPerFloor; r++) {
              const roomNum = (currentFloor * 100) + r;
              roomsToAdd.push({
                  number: roomNum.toString(),
                  type: this.wizDefaultType,
                  price: this.wizDefaultPrice,
                  amenities: amenities
              });
          }
      }

      this.data.addRoomsBulk(roomsToAdd);
      this.showBulkWizard.set(false);
      alert(`${roomsToAdd.length} rooms generated successfully.`);
  }

  downloadBackup() {
    const json = this.data.getExportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    this.hasBackedUp.set(true);
  }

  triggerRestore(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
       const file = input.files[0];
       const reader = new FileReader();
       
       reader.onload = (e) => {
          const content = e.target?.result as string;
          if (confirm('WARNING: This will overwrite all current system data with the backup file. Continue?')) {
             const success = this.data.importData(content);
             if (success) {
                alert('System successfully restored.');
                // Refresh form values
                const config = this.data.hotelConfig();
                this.configForm.patchValue(config);
             } else {
                alert('Failed to restore data. Invalid backup file.');
             }
          }
       };
       reader.readAsText(file);
    }
  }

  hardReset() {
    if (!this.hasBackedUp()) return;
    
    const mode = confirm('Initialize system with Demo Data (Rooms, Guests, Staff)? \n\nClick Cancel for a completely empty system.');
    
    if (confirm('FINAL WARNING: This action is irreversible. All current data will be lost. Proceed?')) {
       this.data.factoryReset(mode); // true = demo, false = empty
       alert('System re-initialized.');
       this.hasBackedUp.set(false);
       // Refresh form
       this.configForm.patchValue(this.data.hotelConfig());
       
       // If empty reset, offer wizard
       if (!mode) {
           this.showBulkWizard.set(true);
       }
    }
  }
}
