import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DataService, MaintenanceRequest } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AiService } from '../services/ai.service';

@Component({
    selector: 'app-maintenance',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    template: `
    <div class="p-6 h-full flex flex-col">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Maintenance Tracker</h1>
          <p class="text-gray-500 text-sm">Monitor issues, track costs, and dispatch teams</p>
        </div>
        <button (click)="openReportModal()" class="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          Report Issue
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <div class="text-gray-500 text-xs font-bold uppercase tracking-wide">Active Issues</div>
             <div class="text-3xl font-bold text-gray-800 mt-1">{{ activeRequests().length }}</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <div class="text-gray-500 text-xs font-bold uppercase tracking-wide">High Priority</div>
             <div class="text-3xl font-bold text-rose-600 mt-1">{{ highPriorityCount() }}</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <div class="text-gray-500 text-xs font-bold uppercase tracking-wide">Pending Costs</div>
             <div class="text-3xl font-bold text-gray-800 mt-1">\${{ totalCost() | number }}</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <div class="text-gray-500 text-xs font-bold uppercase tracking-wide">Resolved (30 Days)</div>
             <div class="text-3xl font-bold text-emerald-600 mt-1">{{ resolvedCount() }}</div>
          </div>
      </div>

      <!-- Filters -->
      <div class="flex gap-4 mb-4">
          <button (click)="filterStatus.set('Active')" 
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            [class.bg-gray-800]="filterStatus() === 'Active'" [class.text-white]="filterStatus() === 'Active'"
            [class.bg-white]="filterStatus() !== 'Active'" [class.text-gray-600]="filterStatus() !== 'Active'">
            Active Issues
          </button>
          <button (click)="filterStatus.set('All')" 
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            [class.bg-gray-800]="filterStatus() === 'All'" [class.text-white]="filterStatus() === 'All'"
            [class.bg-white]="filterStatus() !== 'All'" [class.text-gray-600]="filterStatus() !== 'All'">
            History
          </button>
      </div>

      <!-- Request List -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
          <div class="overflow-y-auto flex-1">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm min-w-[700px]">
                  <thead class="bg-gray-50 text-gray-500 sticky top-0 z-10">
                      <tr>
                          <th class="p-4 font-medium">Room</th>
                          <th class="p-4 font-medium">Issue</th>
                          <th class="p-4 font-medium">Priority</th>
                          <th class="p-4 font-medium">Status</th>
                          <th class="p-4 font-medium">Reported</th>
                          <th class="p-4 font-medium text-right">Cost</th>
                          <th class="p-4 font-medium text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                      @for (req of filteredRequests(); track req.id) {
                          <tr class="hover:bg-gray-50 transition-colors group">
                              <td class="p-4 font-bold text-gray-800">{{ req.roomNumber }}</td>
                              <td class="p-4">
                                  <div class="text-gray-900 font-medium">{{ req.description }}</div>
                                  <div class="text-xs text-gray-500">By {{ req.reportedBy }}</div>
                              </td>
                              <td class="p-4">
                                  <span class="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
                                    [class.bg-rose-100]="req.priority === 'Emergency'" [class.text-rose-700]="req.priority === 'Emergency'"
                                    [class.bg-orange-100]="req.priority === 'High'" [class.text-orange-700]="req.priority === 'High'"
                                    [class.bg-yellow-100]="req.priority === 'Medium'" [class.text-yellow-700]="req.priority === 'Medium'"
                                    [class.bg-blue-100]="req.priority === 'Low'" [class.text-blue-700]="req.priority === 'Low'">
                                    {{ req.priority }}
                                  </span>
                              </td>
                              <td class="p-4">
                                  <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full"
                                    [class.bg-gray-100]="req.status === 'Pending'" [class.text-gray-600]="req.status === 'Pending'"
                                    [class.bg-indigo-100]="req.status === 'In Progress'" [class.text-indigo-600]="req.status === 'In Progress'"
                                    [class.bg-emerald-100]="req.status === 'Completed'" [class.text-emerald-700]="req.status === 'Completed'">
                                    <span class="w-1.5 h-1.5 rounded-full" 
                                        [class.bg-gray-500]="req.status === 'Pending'"
                                        [class.bg-indigo-500]="req.status === 'In Progress'"
                                        [class.bg-emerald-500]="req.status === 'Completed'"></span>
                                    {{ req.status }}
                                  </span>
                              </td>
                              <td class="p-4 text-gray-500 text-xs">
                                  {{ req.reportedAt | date:'short' }}
                              </td>
                              <td class="p-4 text-right font-mono text-gray-700">
                                  {{ req.cost > 0 ? ('$' + req.cost) : '-' }}
                              </td>
                              <td class="p-4 text-right">
                                  @if (req.status !== 'Completed') {
                                    <button (click)="resolveRequest(req)" class="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded transition-colors">
                                        Update / Resolve
                                    </button>
                                  } @else {
                                    <span class="text-gray-400 text-xs">Closed</span>
                                  }
                              </td>
                          </tr>
                      } @empty {
                          <tr>
                              <td colspan="7" class="p-12 text-center text-gray-400">
                                  No maintenance records found.
                              </td>
                          </tr>
                      }
                  </tbody>
                </table>
              </div>
          </div>
      </div>

      <!-- New Request Modal -->
      @if (showReportModal()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
                <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-gray-800">Report Maintenance Issue</h3>
                    <button (click)="showReportModal.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form [formGroup]="reportForm" (ngSubmit)="submitReport()" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Room</label>
                        <select formControlName="roomId" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white">
                            @for (room of data.rooms(); track room.id) {
                                <option [value]="room.id">Room {{ room.roomNumber }} ({{ room.status }})</option>
                            }
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                        <textarea formControlName="description" rows="3" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. AC making loud noise..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select formControlName="priority" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white">
                            <option value="Low">Low - Cosmetic</option>
                            <option value="Medium">Medium - Standard Fix</option>
                            <option value="High">High - Affects Guest</option>
                            <option value="Emergency">Emergency - Immediate Action</option>
                        </select>
                    </div>
                    
                    <div class="bg-blue-50 p-3 rounded text-xs text-blue-700 flex gap-2 items-start">
                        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <p>Submitting this will automatically notify the maintenance team via email simulation and block the room availability.</p>
                    </div>

                    <div class="flex justify-end pt-2 gap-3">
                        <button type="button" (click)="showReportModal.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" [disabled]="reportForm.invalid || submitting()" class="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 flex items-center gap-2">
                            @if (submitting()) { <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> }
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
      }

      <!-- Resolve/Update Modal -->
      @if (selectedRequest()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in">
                <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-gray-800">Update Ticket #{{ selectedRequest()?.id?.substring(0,4) }}</h3>
                    <button (click)="selectedRequest.set(null)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div class="p-6 space-y-4">
                    <div class="text-sm text-gray-600">
                        <strong>Issue:</strong> {{ selectedRequest()?.description }}<br>
                        <strong>Current Status:</strong> {{ selectedRequest()?.status }}
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                        <select [(ngModel)]="updateStatus" class="w-full border border-gray-300 rounded-lg p-2 bg-white">
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed (Resolves Issue)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Cost incurred ($)</label>
                        <input type="number" [(ngModel)]="updateCost" min="0" class="w-full border border-gray-300 rounded-lg p-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea [(ngModel)]="updateNotes" rows="2" class="w-full border border-gray-300 rounded-lg p-2"></textarea>
                    </div>

                    <div class="flex justify-end pt-2 gap-3">
                         <button (click)="selectedRequest.set(null)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                         <button (click)="submitUpdate()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Update Ticket</button>
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
export class MaintenanceComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    ai = inject(AiService);
    fb = inject(FormBuilder);

    filterStatus = signal<'Active' | 'All'>('Active');
    showReportModal = signal(false);
    submitting = signal(false);

    selectedRequest = signal<MaintenanceRequest | null>(null);
    updateStatus: MaintenanceRequest['status'] = 'Pending';
    updateCost = 0;
    updateNotes = '';

    reportForm: FormGroup;

    constructor() {
        this.reportForm = this.fb.group({
            roomId: ['', Validators.required],
            description: ['', Validators.required],
            priority: ['Medium', Validators.required]
        });
    }

    activeRequests = computed(() => this.data.maintenanceRequests().filter(r => r.status !== 'Completed'));

    filteredRequests = computed(() => {
        const all = this.data.maintenanceRequests();
        if (this.filterStatus() === 'Active') {
            return all.filter(r => r.status !== 'Completed');
        }
        return all;
    });

    highPriorityCount = computed(() =>
        this.activeRequests().filter(r => r.priority === 'High' || r.priority === 'Emergency').length
    );

    totalCost = computed(() => {
        let sum = 0;
        for (const r of this.data.maintenanceRequests()) {
            sum += (r.cost || 0);
        }
        return sum;
    });

    resolvedCount = computed(() =>
        this.data.maintenanceRequests().filter(r => r.status === 'Completed').length
    );

    openReportModal() {
        this.reportForm.reset({ priority: 'Medium' });
        this.showReportModal.set(true);
    }

    async submitReport() {
        if (this.reportForm.valid) {
            this.submitting.set(true);
            const val = this.reportForm.value;

            const newReq = await this.data.addMaintenanceRequest({
                roomId: val.roomId,
                description: val.description,
                priority: val.priority,
                reportedBy: this.auth.currentUser()?.username || 'System'
            });

            if (newReq) {
                // Simulate AI Email Dispatch
                const emailBody = await this.ai.draftMaintenanceAlert(newReq);
                console.log('--- EMAIL SIMULATION ---');
                console.log(`To: ${this.data.hotelConfig().maintenanceEmail}`);
                console.log(`Subject: New Work Order - Room ${newReq.roomNumber}`);
                console.log(emailBody);

                // Simulate network delay for "sending"
                await new Promise(r => setTimeout(r, 800));
                alert(`Work Order dispatched to maintenance team!\n\n(See console for AI generated email)`);
            }

            this.submitting.set(false);
            this.showReportModal.set(false);
        }
    }

    resolveRequest(req: MaintenanceRequest) {
        this.selectedRequest.set(req);
        this.updateStatus = req.status;
        this.updateCost = req.cost;
        this.updateNotes = req.notes || '';
    }

    submitUpdate() {
        const req = this.selectedRequest();
        if (req) {
            this.data.updateMaintenanceRequest(req.id, {
                status: this.updateStatus,
                cost: this.updateCost,
                notes: this.updateNotes,
                completedAt: this.updateStatus === 'Completed' ? new Date().toISOString() : undefined
            });
            this.selectedRequest.set(null);
        }
    }
}