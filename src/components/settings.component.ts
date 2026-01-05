import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DataService, HotelConfig, Room } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { doc, setDoc } from 'firebase/firestore';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    template: `
    <div class="p-8 max-w-7xl mx-auto space-y-8">
      <div class="flex justify-between items-end border-b border-gray-100 pb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">System Settings</h1>
          <p class="text-gray-500 mt-1 font-medium">Property configuration and data management</p>
        </div>
        <div class="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-100 shadow-sm">
           v1.0.0
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Property Profile -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
           <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
             <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
             </div>
             Property Profile
           </h2>
           <form [formGroup]="configForm" (ngSubmit)="updateConfig()" class="space-y-5">
              <!-- ... existing form fields ... -->
              <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-1.5">Hotel Name</label>
                 <input formControlName="name" type="text" class="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200">
              </div>
              <div>
                 <label class="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
                 <input formControlName="address" type="text" class="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200">
              </div>
              <div class="grid grid-cols-2 gap-5">
                 <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input formControlName="email" type="email" class="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200">
                 </div>
                 <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                    <input formControlName="phone" type="text" class="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200">
                 </div>
              </div>
              
              <div class="flex justify-end items-center pt-6 mt-2 border-t border-gray-50">
                   <button type="submit" [disabled]="configForm.pristine" class="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all font-medium">
                       Save Changes
                   </button>
               </div>
           </form>
        </div>
        
        <!-- Environment Mode (New Separate Card) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
           <div class="absolute top-0 right-0 p-4 opacity-5">
               <svg class="w-24 h-24 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
           </div>
           <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
             <div class="p-2 bg-violet-50 rounded-lg text-violet-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
             </div>
             System Mode
           </h2>
           <p class="text-sm text-gray-500 mb-6 relative z-10">Switch between training mode (with sample data) and production mode. <br><span class="text-rose-600 font-bold">Note: Switching modes will reset the database.</span></p>
           
           <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 relative z-10">
              <div class="relative flex items-center">
                 <input type="checkbox" [checked]="data.hotelConfig().demoMode" (change)="toggleDemoMode($event)" id="demoModeToggle" class="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-violet-600 checked:bg-violet-600">
                 <svg class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <label for="demoModeToggle" class="font-bold text-gray-700 cursor-pointer select-none">
                  {{ data.hotelConfig().demoMode ? 'Training / Demo Mode' : 'Production Mode' }}
              </label>
           </div>
        </div>

        <!-- Data Management -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col hover:shadow-md transition-shadow duration-300">
           <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
             <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
             </div>
             Backup & Restore
           </h2>
           <p class="text-sm text-gray-500 mb-8 leading-relaxed">Create comprehensive backups of your entire hotel database including guests, financial records, and staff logs. Keep your data safe.</p>
           
           <div class="space-y-4 flex-1">
              <button (click)="downloadBackup()" class="group w-full flex items-center justify-between bg-white border border-emerald-200 p-4 rounded-xl hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-50 transition-all duration-300">
                 <div class="flex items-center gap-4">
                    <div class="bg-emerald-50 text-emerald-600 p-3 rounded-lg group-hover:bg-emerald-100 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    </div>
                    <div class="text-left">
                        <div class="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">Download System Backup</div>
                        <div class="text-xs text-gray-400 font-medium">JSON format • {{ (data.getExportData().length / 1024) | number:'1.1-2' }} KB</div>
                    </div>
                 </div>
                 <svg class="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>

              <div class="relative w-full flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl hover:border-slate-400 hover:shadow-md hover:shadow-slate-50 transition-all duration-300 cursor-pointer group">
                 <input type="file" (change)="triggerRestore($event)" accept=".json" class="absolute inset-0 opacity-0 cursor-pointer z-10">
                 <div class="flex items-center gap-4">
                    <div class="bg-slate-50 text-slate-600 p-3 rounded-lg group-hover:bg-slate-100 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    </div>
                    <div class="text-left">
                        <div class="font-bold text-gray-800 group-hover:text-slate-700 transition-colors">Restore from File</div>
                        <div class="text-xs text-gray-400 font-medium">Drag & Drop or Click to Upload</div>
                    </div>
                 </div>
                 <svg class="w-5 h-5 text-gray-300 group-hover:text-slate-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
           </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-sm border border-rose-100 p-8 lg:col-span-2 relative overflow-hidden">
           <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-rose-100 rounded-full opacity-50 blur-2xl"></div>
           <div class="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div class="max-w-xl">
                  <h2 class="text-xl font-bold text-rose-900 flex items-center gap-3">
                    <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    System Re-Initialization
                  </h2>
                  <p class="text-sm text-rose-700/80 mt-2 leading-relaxed">Permanently erase all data and reset the system to its factory state. This action cannot be undone. Please ensure you have a valid backup before proceeding.</p>
               </div>
               
               <div class="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-2 pr-3 rounded-xl border border-rose-100 shadow-sm">
                  <div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-50 border border-rose-100">
                      <div class="w-2 h-2 rounded-full" [class.bg-emerald-500]="hasBackedUp()" [class.bg-rose-500]="!hasBackedUp()"></div>
                      <span class="text-xs font-bold" [class.text-emerald-700]="hasBackedUp()" [class.text-rose-700]="!hasBackedUp()">
                          {{ hasBackedUp() ? 'Backup Verified' : 'Backup Required' }}
                      </span>
                  </div>
                  <button (click)="hardReset()" [disabled]="!hasBackedUp()" 
                    class="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-rose-200 hover:shadow-rose-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95">
                      {{ hasBackedUp() ? 'Re-Initialize System' : 'Download Backup First' }}
                  </button>
               </div>
           </div>
        </div>
      </div>

      <!-- Database Visualizer -->
      <div class="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden text-slate-300 ring-1 ring-white/5">
         <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50 backdrop-blur">
            <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h2 class="font-bold font-mono text-sm text-indigo-400 tracking-wide">SYSTEM_DATABASE_VISUALIZER</h2>
            </div>
            <button (click)="showRaw.set(!showRaw())" class="text-xs font-medium border border-slate-700 hover:bg-slate-800 hover:text-white px-4 py-1.5 rounded-lg text-slate-400 transition-all">
                {{ showRaw() ? 'Hide Raw JSON' : 'Show Raw JSON' }}
            </button>
         </div>
         
         <div class="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
             <div class="relative group">
                <div class="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full group-hover:bg-indigo-500/10 transition-all"></div>
                <div class="relative">
                    <div class="text-slate-500 uppercase text-[10px] font-bold tracking-wider mb-2">Total Rooms</div>
                    <div class="text-3xl font-light text-white">{{ data.rooms().length }}</div>
                </div>
             </div>
             <div class="relative group">
                <div class="absolute inset-0 bg-emerald-500/5 blur-xl rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
                <div class="relative">
                    <div class="text-slate-500 uppercase text-[10px] font-bold tracking-wider mb-2">Guest Profiles</div>
                    <div class="text-3xl font-light text-white">{{ data.guests().length }}</div>
                </div>
             </div>
             <div class="relative group">
                <div class="absolute inset-0 bg-amber-500/5 blur-xl rounded-full group-hover:bg-amber-500/10 transition-all"></div>
                <div class="relative">
                    <div class="text-slate-500 uppercase text-[10px] font-bold tracking-wider mb-2">Financial Docs</div>
                    <div class="text-3xl font-light text-white">{{ data.documents().length }}</div>
                </div>
             </div>
             <div class="relative group">
                <div class="absolute inset-0 bg-blue-500/5 blur-xl rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                <div class="relative">
                    <div class="text-slate-500 uppercase text-[10px] font-bold tracking-wider mb-2">System Logs</div>
                    <div class="text-3xl font-light text-white">{{ data.logs().length }}</div>
                </div>
             </div>
         </div>

         @if (showRaw()) {
            <div class="bg-black/50 p-0 overflow-hidden border-t border-slate-800 animate-fade-in">
                <div class="p-2 bg-slate-950 border-b border-slate-800 text-[10px] text-slate-500 font-mono flex gap-4">
                    <span>Format: JSON</span>
                    <span>Encoding: UTF-8</span>
                </div>
                <div class="p-4 overflow-auto h-96 custom-scrollbar">
                    <pre class="font-mono text-xs text-emerald-400 leading-relaxed">{{ data.getExportData() }}</pre>
                </div>
            </div>
         }
      </div>

      <!-- Bulk Room Creation Wizard -->
      @if (showBulkWizard()) {
        <div class="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh] ring-1 ring-black/5">
                <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900">Room Setup Wizard</h2>
                        <p class="text-sm text-gray-500 mt-1">Initialize your hotel inventory structure</p>
                    </div>
                    <div class="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                    </div>
                </div>

                <div class="p-8 overflow-y-auto space-y-8 flex-1">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Structure</h3>
                            <div class="space-y-5">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Number of Floors</label>
                                    <input type="number" [(ngModel)]="wizFloors" min="1" max="20" class="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Rooms per Floor</label>
                                    <input type="number" [(ngModel)]="wizRoomsPerFloor" min="1" max="50" class="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Starting Floor #</label>
                                    <input type="number" [(ngModel)]="wizStartFloor" min="1" class="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                             <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Defaults</h3>
                             <div class="space-y-5">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Room Type</label>
                                    <select [(ngModel)]="wizDefaultType" class="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none">
                                        <option value="Single">Single</option>
                                        <option value="Double">Double</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Penthouse">Penthouse</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Base Price</label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-3 text-gray-400 font-medium">$</span>
                                        <input type="number" [(ngModel)]="wizDefaultPrice" class="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 pl-7 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Amenities</label>
                                    <input type="text" [(ngModel)]="wizAmenities" class="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Wifi, TV...">
                                </div>
                             </div>
                        </div>
                    </div>

                    <div class="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 text-sm text-emerald-800 flex gap-3 items-start">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <div>
                            <p class="font-semibold mb-1">Summary</p>
                            <p class="opacity-90">
                                This will generate <strong>{{ wizFloors * wizRoomsPerFloor }}</strong> rooms. 
                                <br>Range: Room {{ (wizStartFloor * 100) + 1 }} to {{ ((wizStartFloor + wizFloors - 1) * 100) + wizRoomsPerFloor }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button (click)="showBulkWizard.set(false)" class="px-6 py-2.5 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-xl font-medium transition-colors">Skip Setup</button>
                    <button (click)="runBulkWizard()" class="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center gap-2">
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
    wizDefaultType: Room['roomType'] = 'Single';
    wizDefaultPrice = 120;
    wizAmenities = 'Wifi, TV, Mini-bar';

    constructor() {
        const config = this.data.hotelConfig();
        this.configForm = this.fb.group({
            name: [config.name, Validators.required],
            address: [config.address, Validators.required],
            email: [config.email, [Validators.required, Validators.email]],
            phone: [config.phone, Validators.required]
        });
    }

    updateConfig() {
        console.log('[Settings] Updating config. Valid:', this.configForm.valid, 'Errors:', this.configForm.errors);

        if (this.configForm.valid) {
            const newConfig = this.configForm.value;
            // Merge form data with existing config to preserve other fields like demoMode/maintenanceEmail if they aren't in form
            const fullConfig = { ...this.data.hotelConfig(), ...newConfig };

            console.log('[Settings] Saving config:', fullConfig);
            this.data.updateHotelDetails(fullConfig);
            this.configForm.markAsPristine();
            alert('Property profile updated successfully.');
        } else {
            // Find invalid controls
            const controls = this.configForm.controls;
            let errors = '';
            for (const name in controls) {
                if (controls[name].invalid) {
                    errors += `${name} is invalid. `;
                }
            }
            alert('Cannot save changes: ' + errors);
        }
    }

    toggleDemoMode(event: Event) {
        const input = event.target as HTMLInputElement;
        const enableDemo = input.checked;
        const oldState = !enableDemo; // if we clicked to checked, old was unchecked

        if (enableDemo) {
            // Enabling Demo Mode
            if (confirm("Enable Demo Mode? This will wipe your current data and load sample data.")) {
                this.data.factoryReset(true);
            } else {
                // Revert checkbox in UI if cancelled
                input.checked = false;
            }
        } else {
            // Disabling Demo Mode (Going Real)
            if (confirm("Disable Demo Mode? This will WIPE ALL MOCK DATA to prepare for real usage.")) {
                this.data.factoryReset(false);
                this.showBulkWizard.set(true);
            } else {
                // Revert
                input.checked = true;
            }
        }
    }

    async runBulkWizard() {
        const roomsToAdd: Omit<Room, 'id' | 'status' | 'hotel'>[] = [];
        const amenities = this.wizAmenities.split(',').map(s => s.trim()).filter(s => s.length > 0);

        for (let f = 0; f < this.wizFloors; f++) {
            const currentFloor = this.wizStartFloor + f;
            for (let r = 1; r <= this.wizRoomsPerFloor; r++) {
                const roomNum = (currentFloor * 100) + r;
                roomsToAdd.push({
                    roomNumber: roomNum.toString(),
                    roomType: this.wizDefaultType,
                    dailyRate: this.wizDefaultPrice,
                    capacity: this.wizDefaultType === 'Single' ? 1 : 2, // Simple logic
                    // amenities // Amenities not in Room type yet if looking at schema, but ignoring for now
                });
            }
        }

        await this.data.addRoomsBulk(roomsToAdd);
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
