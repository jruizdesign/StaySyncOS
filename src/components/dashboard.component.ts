import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p class="text-gray-500 text-sm">Real-time overview of hotel operations</p>
        </div>
        <button (click)="generateReport()" [disabled]="loadingReport()" 
          class="w-full md:w-auto flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
          {{ loadingReport() ? 'Analyzing...' : 'AI Daily Insight' }}
        </button>
      </div>

      <!-- AI Report Area -->
       @if (aiReport()) {
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100 animate-fade-in">
          <h3 class="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Manager Assistant Report
          </h3>
          <div class="prose prose-sm text-indigo-800 whitespace-pre-line">{{ aiReport() }}</div>
        </div>
       }

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="text-gray-500 text-sm font-medium">Occupancy Rate</div>
          <div class="text-3xl font-bold text-gray-800 mt-1">{{ data.stats().occupancyRate }}%</div>
          <div class="mt-2 w-full bg-gray-100 rounded-full h-1.5">
            <div class="bg-emerald-500 h-1.5 rounded-full" [style.width.%]="data.stats().occupancyRate"></div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="text-gray-500 text-sm font-medium">Rooms Available</div>
          <div class="text-3xl font-bold text-gray-800 mt-1">{{ data.stats().available }}</div>
          <div class="text-xs text-emerald-600 font-medium mt-1">Ready for check-in</div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="text-gray-500 text-sm font-medium">In Maintenance</div>
          <div class="text-3xl font-bold text-gray-800 mt-1">{{ data.stats().maintenance }}</div>
           <div class="text-xs text-amber-600 font-medium mt-1">Requires attention</div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="text-gray-500 text-sm font-medium">Guests with Debt</div>
          <div class="text-3xl font-bold text-rose-600 mt-1">{{ data.activeStaysWithDebt().length }}</div>
          <div class="text-xs text-gray-400 mt-1">Active stays only</div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Debt Monitor -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 class="font-semibold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Outstanding Guest Balances
            </h2>
            <span class="text-xs font-medium px-2 py-1 bg-rose-100 text-rose-700 rounded">High Priority</span>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm min-w-[600px]">
              <thead class="bg-gray-50 text-gray-500">
                <tr>
                  <th class="px-4 py-3 font-medium">Guest / Room</th>
                  <th class="px-4 py-3 font-medium">Stay Duration</th>
                  <th class="px-4 py-3 font-medium text-right">Total Charges</th>
                  <th class="px-4 py-3 font-medium text-right">Paid</th>
                  <th class="px-4 py-3 font-medium text-right">Balance Due</th>
                  <th class="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (item of data.activeStaysWithDebt(); track item.stay.id) {
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3">
                      <div class="font-medium text-gray-900">{{ item.guest?.name || 'Unknown' }}</div>
                      <div class="text-xs text-gray-500">Room {{ item.room?.number }} • {{ item.room?.type }}</div>
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.daysStayed }} nights
                    </td>
                    <td class="px-4 py-3 text-right text-gray-600">\${{ item.totalCostSoFar }}</td>
                    <td class="px-4 py-3 text-right text-emerald-600 font-medium">\${{ item.stay.totalPaid }}</td>
                    <td class="px-4 py-3 text-right font-bold" [class.text-rose-600]="item.debt > 0" [class.text-emerald-600]="item.debt <= 0">
                      \${{ item.debt }}
                    </td>
                    <td class="px-4 py-3 text-center">
                      @if (item.debt > 0) {
                        <button (click)="openPayment(item)" class="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2 py-1 rounded transition-colors">
                          Collect
                        </button>
                      } @else {
                        <span class="text-emerald-500 text-xs flex items-center justify-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                          Paid
                        </span>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="6" class="p-8 text-center text-gray-400">No active debts found. Good job!</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Logs -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
          <div class="p-4 border-b border-gray-100 bg-gray-50">
            <h2 class="font-semibold text-gray-800">Live Activity Feed</h2>
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            @for (log of data.logs().slice(0, 15); track log.id) {
              <div class="flex gap-3 text-sm">
                <div class="mt-1">
                  @if (log.category === 'Finance') {
                    <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                  } @else if (log.category === 'Room') {
                    <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                  } @else if (log.category === 'Guest') {
                    <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                  } @else {
                    <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                  }
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-gray-900">{{ log.action }}</span>
                    <span class="text-xs text-gray-400">{{ log.timestamp | date:'shortTime' }}</span>
                  </div>
                  <p class="text-gray-500 mt-0.5">{{ log.details }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  data = inject(DataService);
  ai = inject(AiService);
  
  aiReport = signal<string>('');
  loadingReport = signal(false);

  async generateReport() {
    this.loadingReport.set(true);
    const logs = this.data.logs().slice(0, 10).map(l => `${l.action}: ${l.details}`).join('\n');
    const debts = this.data.activeStaysWithDebt().slice(0, 5).map(d => `${d.guest?.name} owes $${d.debt}`).join('\n');
    
    this.aiReport.set(await this.ai.generateDailyReport(logs, debts));
    this.loadingReport.set(false);
  }

  openPayment(item: any) {
    // Simple prompt for demo
    const amountStr = prompt(`Collect payment from ${item.guest.name}. Owed: $${item.debt}`, item.debt.toString());
    if (amountStr) {
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
        this.data.makePayment(item.stay.id, amount);
      }
    }
  }
}