import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { DataService, Staff, TimeLog, Shift } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-staff-manager',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    template: `
    <div class="p-6 space-y-6 h-full flex flex-col">
      <!-- Header with Role-Based Controls -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
           <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
             Staff & Shifts
             @if(adminMode()) {
               <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full border border-indigo-200">Admin Mode</span>
             }
           </h1>
           <p class="text-gray-500 text-sm">Manage team schedules, time clocks, and profiles</p>
        </div>
        
        <div class="flex items-center gap-4">
            
           <!-- View Toggles -->
           <div class="bg-gray-100 p-1 rounded-lg flex text-sm font-medium">
             <button (click)="viewMode.set('directory')" 
               class="px-4 py-1.5 rounded-md transition-all"
               [class.bg-white]="viewMode() === 'directory'" 
               [class.shadow-sm]="viewMode() === 'directory'"
               [class.text-indigo-600]="viewMode() === 'directory'"
               [class.text-gray-500]="viewMode() !== 'directory'">
               Directory & Kiosk
             </button>
             <button (click)="viewMode.set('schedule')" 
               class="px-4 py-1.5 rounded-md transition-all"
               [class.bg-white]="viewMode() === 'schedule'" 
               [class.shadow-sm]="viewMode() === 'schedule'"
               [class.text-indigo-600]="viewMode() === 'schedule'"
               [class.text-gray-500]="viewMode() !== 'schedule'">
               Weekly Schedule
             </button>
           </div>

           <!-- Manager Only Controls -->
           @if (auth.isManager()) {
            <div class="h-8 w-px bg-gray-200 mx-2"></div>
            
            <div class="flex items-center gap-2 cursor-pointer select-none" (click)="toggleAdminMode()">
                <span class="text-sm font-medium" [class.text-indigo-600]="adminMode()" [class.text-gray-600]="!adminMode()">
                    {{ adminMode() ? 'Editing' : 'View' }}
                </span>
                <div class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none"
                    [class.bg-indigo-600]="adminMode()" [class.bg-gray-300]="!adminMode()">
                    <span class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform shadow-sm"
                        [class.translate-x-5]="adminMode()" [class.translate-x-1]="!adminMode()"></span>
                </div>
            </div>

            @if (adminMode() && viewMode() === 'directory') {
                <button (click)="showInviteUser.set(true)" class="flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition shadow-sm text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                    <span>Invite User</span>
                </button>
                <button (click)="showAddStaff.set(true)" class="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm">
                    <span>+ Staff</span>
                </button>
            }
           }
        </div>
      </div>

      <!-- VIEW: DIRECTORY & KIOSK -->
      @if (viewMode() === 'directory') {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 animate-fade-in">
            
            <!-- Left: Staff List (Directory) -->
            <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px] lg:h-auto">
            <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <span class="font-semibold text-gray-700">Team Directory</span>
                <span class="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{{ data.staff().length }}</span>
            </div>
            <div class="overflow-y-auto flex-1 p-2 space-y-2">
                @for (s of data.staff(); track s.id) {
                <div (click)="selectStaff(s)" class="p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md group relative"
                    [class.border-indigo-500]="selectedStaff()?.id === s.id"
                    [class.bg-indigo-50]="selectedStaff()?.id === s.id"
                    [class.border-gray-100]="selectedStaff()?.id !== s.id">
                    
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                [ngClass]="getRoleColor(s.role).bg">
                                {{ s.name.charAt(0).toUpperCase() }}
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-sm">{{ s.name }}</div>
                                <div class="flex items-center gap-1 mt-0.5">
                                    <span class="px-1.5 py-0.5 rounded text-[10px] font-medium border"
                                        [ngClass]="getRoleBadgeStyle(s.role)">
                                        {{ s.role }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Status Indicator -->
                    <div class="flex justify-between items-center mt-2 pl-11">
                        <div class="text-xs font-medium flex items-center gap-1.5"
                            [class.text-emerald-600]="s.currentStatus === 'Clocked In'"
                            [class.text-amber-600]="s.currentStatus === 'On Break'"
                            [class.text-gray-400]="s.currentStatus === 'Clocked Out'">
                            <span class="w-2 h-2 rounded-full"
                            [class.bg-emerald-500]="s.currentStatus === 'Clocked In'"
                            [class.bg-amber-500]="s.currentStatus === 'On Break'"
                            [class.bg-gray-300]="s.currentStatus === 'Clocked Out'"></span>
                            {{ s.currentStatus }}
                        </div>
                    </div>
                </div>
                }
            </div>
            </div>

            <!-- Middle: Time Clock Kiosk -->
            <div class="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-xl shadow-lg text-white p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
                <!-- Decorative BG -->
                <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

                @if (selectedStaff(); as s) {
                    <div class="z-10 text-center w-full max-w-sm animate-fade-in relative">
                        
                        <!-- ID Badge Look -->
                        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl">
                            <div class="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-4 border-white/20 flex items-center justify-center mb-4 shadow-inner">
                                <span class="text-3xl font-bold text-gray-600">{{ s.name.charAt(0) }}</span>
                            </div>
                            <h2 class="text-2xl font-bold mb-1">{{ s.name }}</h2>
                            <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-indigo-200 border border-white/10 mb-6">
                                {{ s.role }}
                            </div>

                            <div class="grid grid-cols-2 gap-4 text-center border-t border-white/10 pt-4">
                                <div>
                                    <div class="text-xs text-slate-400 uppercase">Status</div>
                                    <div class="font-bold" 
                                        [class.text-emerald-400]="s.currentStatus === 'Clocked In'"
                                        [class.text-amber-400]="s.currentStatus === 'On Break'"
                                        [class.text-slate-400]="s.currentStatus === 'Clocked Out'">
                                        {{ s.currentStatus }}
                                    </div>
                                </div>
                                <div>
                                    <div class="text-xs text-slate-400 uppercase">Shift Time</div>
                                    <div class="font-mono text-white">00:00</div>
                                </div>
                            </div>
                        </div>

                        @if (!pinVerified()) {
                            <div class="space-y-4">
                                <label class="text-sm text-indigo-200">Enter your 4-digit PIN to access actions</label>
                                <div class="flex justify-center gap-2">
                                    <input type="password" [(ngModel)]="enteredPin" maxlength="4"
                                        class="w-32 bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 shadow-inner placeholder-transparent transition-all">
                                </div>
                                <div class="grid grid-cols-2 gap-3 mt-4">
                                    <button (click)="selectedStaff.set(null); enteredPin = ''" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition text-sm">Cancel</button>
                                    <button (click)="verifyPin(s)" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-900/50 transition">Verify</button>
                                </div>
                            </div>
                        } @else {
                            <div class="grid grid-cols-1 gap-3">
                                @if (s.currentStatus === 'Clocked Out') {
                                    <button (click)="clockAction('in')" class="group relative flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/30 transition-all active:scale-95">
                                        <span class="absolute left-0 w-1.5 h-full bg-emerald-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                                        START SHIFT
                                    </button>
                                } @else if (s.currentStatus === 'Clocked In') {
                                    <button (click)="clockAction('break')" class="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-900/30 transition-all active:scale-95">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        Take Break
                                    </button>
                                    <button (click)="clockAction('out')" class="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-900/30 transition-all active:scale-95">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                                        End Shift
                                    </button>
                                } @else if (s.currentStatus === 'On Break') {
                                    <button (click)="clockAction('endBreak')" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/30 transition-all active:scale-95">
                                        Resume Shift
                                    </button>
                                }
                            </div>
                            <button (click)="resetKiosk()" class="mt-8 text-xs text-slate-400 hover:text-white underline">Exit Kiosk Mode</button>
                        }
                    </div>
                } @else {
                    <div class="z-10 text-center text-slate-300">
                        <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <svg class="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        </div>
                        <h3 class="text-xl font-medium text-white mb-2">Time Clock Kiosk</h3>
                        <p class="text-slate-400 max-w-xs mx-auto">Select your name from the directory on the left to clock in, take breaks, or clock out.</p>
                    </div>
                }
            </div>

            <!-- Right: History (Admin only editable) -->
            <div class="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px] lg:h-auto">
                <div class="p-4 border-b border-gray-100 bg-gray-50 font-semibold text-gray-700 flex justify-between items-center">
                    <span>Recent Activity</span>
                    <button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Export</button>
                </div>
                <div class="overflow-y-auto flex-1">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-gray-50 text-gray-500 sticky top-0">
                            <tr>
                                <th class="p-3 pl-4 font-medium">Employee</th>
                                <th class="p-3 font-medium">Date/Time</th>
                                <th class="p-3 text-right font-medium">Hrs</th>
                                <th class="p-3 text-right" *ngIf="adminMode()"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            @for (log of data.timeLogs(); track log.id) {
                                <tr class="hover:bg-gray-50 group">
                                    <td class="p-3 pl-4">
                                        <div class="font-medium text-gray-900">{{ log.staffName }}</div>
                                        <div class="text-[10px] text-gray-400 uppercase tracking-wide">{{ log.status }}</div>
                                    </td>
                                    <td class="p-3 text-gray-600">
                                        <div class="text-xs">{{ log.date | date:'MMM d' }}</div>
                                        <div class="text-xs text-gray-400">{{ log.startTime | date:'shortTime' }}</div>
                                    </td>
                                    <td class="p-3 text-right font-mono text-gray-700">
                                        {{ log.totalHours | number:'1.2-2' }}
                                    </td>
                                    <td class="p-3 text-right" *ngIf="adminMode()">
                                        <button (click)="editLog(log)" class="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 hover:bg-indigo-50 p-1.5 rounded">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                        </button>
                                    </td>
                                </tr>
                            } @empty {
                                <tr>
                                    <td colspan="4" class="p-8 text-center text-gray-400 text-xs">No shift history found.</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      }

      <!-- VIEW: WEEKLY SCHEDULE -->
      @if (viewMode() === 'schedule') {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col animate-fade-in">
           <!-- Calendar Tools -->
           <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
             <div class="flex items-center gap-4">
               <div class="flex bg-white border border-gray-300 rounded-lg p-1">
                 <button (click)="prevWeek()" class="p-1 hover:bg-gray-100 rounded text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>
                 <button (click)="resetToToday()" class="px-3 text-sm font-medium text-gray-700 hover:text-indigo-600">Today</button>
                 <button (click)="nextWeek()" class="p-1 hover:bg-gray-100 rounded text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>
               </div>
               <h2 class="font-bold text-gray-800 text-lg">
                 {{ weekDays()[0] | date:'MMM d' }} - {{ weekDays()[6] | date:'MMM d, y' }}
               </h2>
             </div>
             
             <div class="text-sm text-gray-500">
               Click a cell to add a shift (Managers only)
             </div>
           </div>

           <!-- Grid -->
           <div class="flex-1 overflow-auto">
             <table class="w-full text-sm text-left border-collapse">
               <thead>
                 <tr>
                   <th class="sticky left-0 z-20 bg-gray-100 p-4 border-b border-r border-gray-200 font-semibold text-gray-700 min-w-[150px]">Staff Member</th>
                   @for (day of weekDays(); track day) {
                     <th class="p-4 border-b border-gray-200 bg-gray-50 text-center min-w-[140px]" [class.bg-indigo-50]="isToday(day)">
                       <div class="text-xs uppercase text-gray-500 font-bold mb-1">{{ day | date:'EEE' }}</div>
                       <div class="font-bold text-gray-800" [class.text-indigo-700]="isToday(day)">{{ day | date:'d' }}</div>
                     </th>
                   }
                 </tr>
               </thead>
               <tbody class="divide-y divide-gray-100">
                 @for (staff of data.staff(); track staff.id) {
                   <tr>
                     <!-- Sticky Name Column -->
                     <td class="sticky left-0 bg-white z-10 p-3 border-r border-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                       <div class="font-medium text-gray-900">{{ staff.name }}</div>
                       <div class="text-xs text-gray-500">{{ staff.role }}</div>
                     </td>

                     <!-- Days -->
                     @for (day of weekDays(); track day) {
                       <td class="border-r border-gray-100 relative h-24 p-2 transition-colors hover:bg-gray-50"
                           [class.bg-indigo-50]="isToday(day)"
                           [class.cursor-pointer]="adminMode()"
                           (click)="openShiftModal(staff, day)">
                          
                          <!-- Shifts in this cell -->
                          @for (shift of getShiftsForCell(staff.id, day); track shift.id) {
                            <div class="group relative bg-white border border-l-4 rounded shadow-sm p-1.5 mb-1.5 text-xs hover:shadow-md transition-shadow"
                              (click)="$event.stopPropagation(); deleteShift(shift.id)"
                              [class.border-l-indigo-500]="shift.type === 'Regular'"
                              [class.border-l-amber-500]="shift.type === 'Overtime'"
                              [class.border-l-gray-400]="shift.type === 'TimeOff'">
                              
                              <div class="flex justify-between items-center mb-0.5">
                                <span class="font-bold text-gray-700">
                                   {{ shift.type === 'TimeOff' ? 'OFF' : (shift.startTime + ' - ' + shift.endTime) }}
                                </span>
                                <!-- Delete button (Admin only) -->
                                @if (adminMode()) {
                                    <button class="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                }
                              </div>
                              <div class="text-[10px] text-gray-500 truncate">{{ shift.notes || shift.type }}</div>
                            </div>
                          }
                          
                          <!-- Add hint on hover if admin -->
                          @if (adminMode() && getShiftsForCell(staff.id, day).length === 0) {
                             <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none">
                                <span class="text-indigo-300 text-xl font-bold">+</span>
                             </div>
                          }
                       </td>
                     }
                   </tr>
                 }
               </tbody>
             </table>
           </div>
        </div>
      }

      <!-- Add Staff Modal -->
      @if (showAddStaff()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
             <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 class="font-bold text-gray-800">New Staff Profile</h3>
              <button (click)="showAddStaff.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form [formGroup]="staffForm" (ngSubmit)="submitStaff()" class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input formControlName="name" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="e.g. Jane Doe">
              </div>
               <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Role & Permissions</label>
                <select formControlName="role" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="Manager">Manager (Full Access)</option>
                    <option value="Reception">Reception (Front Desk)</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">Managers can edit logs and add staff.</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Kiosk PIN (4 digits)</label>
                <input formControlName="pin" maxlength="4" type="password" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-mono tracking-widest" placeholder="••••">
              </div>
              <div class="flex justify-end pt-4 gap-3">
                <button type="button" (click)="showAddStaff.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" [disabled]="staffForm.invalid" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium shadow-sm">Create Profile</button>
              </div>
            </form>
          </div>
        </div>
      }
      
      <!-- Invite User Modal -->
      @if (showInviteUser()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
             <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 class="font-bold text-gray-800">Invite User to Hotel</h3>
              <button (click)="showInviteUser.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form [formGroup]="inviteForm" (ngSubmit)="submitInvite()" class="p-6 space-y-4">
              <div class="bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-sm text-indigo-800">
                <p>This will grant the user access to this hotel. The user must already have a StaySyncOS account.</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                <input formControlName="email" type="email" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="user@example.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input formControlName="name" type="text" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Jane Doe">
              </div>
               <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Application Role</label>
                <select formControlName="role" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="Staff">Staff (Standard Access)</option>
                    <option value="Manager">Manager (Full Admin Access)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Kiosk PIN (4 digits)</label>
                <input formControlName="pin" maxlength="4" type="password" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-mono tracking-widest" placeholder="••••">
              </div>
              <div class="flex justify-end pt-4 gap-3">
                <button type="button" (click)="showInviteUser.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" [disabled]="inviteForm.invalid || isInviting()" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 font-medium shadow-sm flex items-center gap-2">
                    @if (isInviting()) {
                        <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    }
                    Invite & Link
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Add Shift Modal -->
      @if (showShiftModal()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in">
                <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-gray-800">Add Shift</h3>
                    <button (click)="showShiftModal.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div class="p-6 space-y-4">
                    <div class="text-sm text-gray-600 mb-2">
                        For <strong>{{ pendingShiftStaff()?.name }}</strong> on <strong>{{ pendingShiftDate() | date:'mediumDate' }}</strong>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Shift Type</label>
                        <select [(ngModel)]="pendingShiftType" class="w-full border border-gray-300 rounded-lg p-2">
                            <option value="Regular">Regular</option>
                            <option value="Overtime">Overtime</option>
                            <option value="TimeOff">Time Off / Unavailable</option>
                        </select>
                    </div>

                    @if (pendingShiftType !== 'TimeOff') {
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Start</label>
                                <input type="time" [(ngModel)]="pendingShiftStart" class="w-full border border-gray-300 rounded-lg p-2">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">End</label>
                                <input type="time" [(ngModel)]="pendingShiftEnd" class="w-full border border-gray-300 rounded-lg p-2">
                            </div>
                        </div>
                    }

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                        <input type="text" [(ngModel)]="pendingShiftNotes" class="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400" placeholder="e.g. Front Desk">
                    </div>

                    <div class="flex justify-end pt-4 gap-3">
                        <button (click)="showShiftModal.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                        <button (click)="submitShift()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm">Save Shift</button>
                    </div>
                </div>
            </div>
        </div>
      }

      <!-- Edit Log Modal -->
      @if (editingLog()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
                 <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-gray-800">Edit Log: {{ editingLog()?.staffName }}</h3>
                    <button (click)="editingLog.set(null)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div class="p-6 space-y-4">
                    <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 flex gap-2">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        <p>Modifying time logs affects total hours calculation. Ensure accuracy.</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <input type="datetime-local" [ngModel]="formatForInput(editingLog()!.startTime)" (ngModelChange)="updateEditTime('startTime', $event)" class="w-full border border-gray-300 rounded-lg p-2.5">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <input type="datetime-local" [ngModel]="formatForInput(editingLog()!.endTime)" (ngModelChange)="updateEditTime('endTime', $event)" class="w-full border border-gray-300 rounded-lg p-2.5">
                    </div>
                    
                    <div class="flex justify-end pt-4 gap-3">
                         <button (click)="editingLog.set(null)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                         <button (click)="saveLogEdit()" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-sm">Update Record</button>
                    </div>
                </div>
            </div>
        </div>
      }
    </div>
  `,
    styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
  `]
})
export class StaffManagerComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    fb = inject(FormBuilder);

    viewMode = signal<'directory' | 'schedule'>('directory');
    adminMode = signal(false);
    showAddStaff = signal(false);
    showInviteUser = signal(false);
    isInviting = signal(false);

    // Schedule State
    scheduleStart = signal(new Date());
    showShiftModal = signal(false);
    pendingShiftStaff = signal<Staff | null>(null);
    pendingShiftDate = signal<Date | null>(null);
    pendingShiftStart = '09:00';
    pendingShiftEnd = '17:00';
    pendingShiftType: 'Regular' | 'Overtime' | 'TimeOff' = 'Regular';
    pendingShiftNotes = '';

    // Kiosk State
    selectedStaff = signal<Staff | null>(null);
    pinVerified = signal(false);
    enteredPin = '';

    // Edit State
    editingLog = signal<TimeLog | null>(null);

    staffForm = this.fb.group({
        name: ['', Validators.required],
        role: ['Reception', Validators.required],
        pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    inviteForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        role: ['Staff', Validators.required],
        pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    toggleAdminMode() {
        // Security check inside method as well
        if (this.auth.isManager()) {
            this.adminMode.update(v => !v);
        }
    }

    getRoleColor(role: string): { bg: string, text: string } {
        switch (role) {
            case 'Manager': return { bg: 'bg-indigo-100', text: 'text-indigo-700' };
            case 'Reception': return { bg: 'bg-purple-100', text: 'text-purple-700' };
            case 'Housekeeping': return { bg: 'bg-pink-100', text: 'text-pink-700' };
            case 'Kitchen': return { bg: 'bg-orange-100', text: 'text-orange-700' };
            case 'Maintenance': return { bg: 'bg-blue-100', text: 'text-blue-700' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
        }
    }

    getRoleBadgeStyle(role: string): string {
        const c = this.getRoleColor(role);
        return `${c.bg} ${c.text} border-${c.text.split('-')[1]}-200`;
    }

    selectStaff(staff: Staff) {
        this.selectedStaff.set(staff);
        this.enteredPin = '';
        this.pinVerified.set(false);
    }

    verifyPin(staff: Staff) {
        if (this.enteredPin === staff.pin) {
            this.pinVerified.set(true);
        } else {
            alert('Incorrect PIN');
            this.enteredPin = '';
        }
    }

    clockAction(action: 'in' | 'out' | 'break' | 'endBreak') {
        const s = this.selectedStaff();
        if (!s) return;

        if (action === 'in') this.data.clockIn(s.id);
        if (action === 'out') this.data.clockOut(s.id);
        if (action === 'break') this.data.startBreak(s.id);
        if (action === 'endBreak') this.data.endBreak(s.id);

        // Refresh local staff reference from signal after update
        const updated = this.data.staff().find(u => u.id === s.id);
        if (updated) this.selectedStaff.set(updated);
    }

    resetKiosk() {
        this.selectedStaff.set(null);
        this.pinVerified.set(false);
        this.enteredPin = '';
    }

    // --- Schedule Logic ---

    weekDays = computed(() => {
        const start = new Date(this.scheduleStart());
        // Adjust to Monday
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(start.setDate(diff));

        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            days.push(d);
        }
        return days;
    });

    isToday(date: Date): boolean {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }

    nextWeek() {
        const d = new Date(this.scheduleStart());
        d.setDate(d.getDate() + 7);
        this.scheduleStart.set(d);
    }

    prevWeek() {
        const d = new Date(this.scheduleStart());
        d.setDate(d.getDate() - 7);
        this.scheduleStart.set(d);
    }

    resetToToday() {
        this.scheduleStart.set(new Date());
    }

    getShiftsForCell(staffId: string, date: Date): Shift[] {
        const dateStr = date.toISOString().split('T')[0];
        return this.data.shifts().filter(s => s.staffId === staffId && s.date === dateStr);
    }

    openShiftModal(staff: Staff, date: Date) {
        if (!this.adminMode()) return;
        this.pendingShiftStaff.set(staff);
        this.pendingShiftDate.set(date);
        this.pendingShiftStart = '09:00';
        this.pendingShiftEnd = '17:00';
        this.pendingShiftType = 'Regular';
        this.pendingShiftNotes = '';
        this.showShiftModal.set(true);
    }

    submitShift() {
        const staff = this.pendingShiftStaff();
        const date = this.pendingShiftDate();
        if (!staff || !date) return;

        this.data.addShift({
            staffId: staff.id,
            date: date.toISOString().split('T')[0],
            startTime: this.pendingShiftStart,
            endTime: this.pendingShiftEnd,
            type: this.pendingShiftType,
            notes: this.pendingShiftNotes
        });
        this.showShiftModal.set(false);
    }

    deleteShift(id: string) {
        if (!this.adminMode()) return;
        if (confirm('Delete this shift?')) {
            this.data.deleteShift(id);
        }
    }

    // --- CRUD ---

    submitStaff() {
        // strict check
        if (!this.auth.isManager()) return;

        if (this.staffForm.valid) {
            this.data.addStaff(this.staffForm.value as any);
            this.showAddStaff.set(false);
            this.staffForm.reset({ role: 'Reception' });
        }
    }

    async submitInvite() {
        if (!this.auth.isManager()) return;
        if (this.inviteForm.invalid) return;

        this.isInviting.set(true);
        try {
            const { email, name, role, pin } = this.inviteForm.value;
            await this.data.linkUserByEmail(email!, role!, name!, pin!);
            alert(`Successfully linked ${email} to this hotel.`);
            this.showInviteUser.set(false);
            this.inviteForm.reset({ role: 'Staff' });
        } catch (err: any) {
            alert(err.message || 'Failed to link user.');
        } finally {
            this.isInviting.set(false);
        }
    }

    editLog(log: TimeLog) {
        if (!this.auth.isManager()) return;
        this.editingLog.set(JSON.parse(JSON.stringify(log)));
    }

    formatForInput(isoString?: string | null): string {
        if (!isoString) return '';
        const d = new Date(isoString);
        const pad = (n: number) => n < 10 ? '0' + n : n;
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    updateEditTime(field: 'startTime' | 'endTime', value: string) {
        const log = this.editingLog();
        if (log) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                (log as any)[field] = date.toISOString();
                this.editingLog.set({ ...log });
            }
        }
    }

    saveLogEdit() {
        if (!this.auth.isManager()) return;
        const log = this.editingLog();
        if (log) {
            this.data.updateTimeLog(log);
            this.editingLog.set(null);
        }
    }
}