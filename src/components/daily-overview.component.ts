import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-daily-overview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6 space-y-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Daily Overview</h1>
          <p class="text-gray-500 text-sm">Snapshot of current occupancy and accrued financials</p>
        </div>
        <div class="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
            {{ today | date:'fullDate' }}
        </div>
      </div>

      <!-- Top Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
           <div class="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-1">Total Outstanding</div>
           <div class="text-3xl font-bold">\${{ totalOutstanding() | number:'1.2-2' }}</div>
           <div class="text-xs text-indigo-200 mt-2">Accrued from active stays</div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
           <div class="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Guests Owning Money</div>
           <div class="text-3xl font-bold text-gray-800">{{ debtorsCount() }}</div>
           <div class="text-xs text-gray-400 mt-2"> / {{ data.stats().occupancyRate }}% Occupancy</div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
           <div class="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Projected Checkout</div>
           <div class="text-3xl font-bold text-gray-800">{{ checkoutsToday() }}</div>
           <div class="text-xs text-gray-400 mt-2">Guests leaving today</div>
        </div>
      </div>

      <!-- Outstanding Balances Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 class="font-bold text-gray-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Room Balances (Active Stays)
            </h2>
        </div>
        
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm min-w-[700px]">
                <thead class="bg-gray-50 text-gray-500">
                    <tr>
                        <th class="p-4 font-medium">Room</th>
                        <th class="p-4 font-medium">Guest</th>
                        <th class="p-4 font-medium">Check In</th>
                        <th class="p-4 font-medium text-right">Rate/Night</th>
                        <th class="p-4 font-medium text-right">Accrued Total</th>
                        <th class="p-4 font-medium text-right">Paid</th>
                        <th class="p-4 font-medium text-right">Balance</th>
                        <th class="p-4 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @for (item of data.activeStaysWithDebt(); track item.stay.id) {
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="p-4">
                                <span class="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">{{ item.room?.number }}</span>
                                <span class="text-xs text-gray-500 ml-2">{{ item.room?.type }}</span>
                            </td>
                            <td class="p-4 font-medium text-gray-700">
                                {{ item.guest?.name }}
                            </td>
                            <td class="p-4 text-gray-600">
                                {{ item.stay.checkIn | date:'shortDate' }}
                                <div class="text-xs text-gray-400">{{ item.daysStayed }} nights</div>
                            </td>
                            <td class="p-4 text-right text-gray-600">
                                \${{ item.stay.ratePerNight }}
                            </td>
                            <td class="p-4 text-right text-gray-600">
                                \${{ item.totalCostSoFar | number:'1.2-2' }}
                            </td>
                            <td class="p-4 text-right text-emerald-600">
                                \${{ item.stay.totalPaid | number:'1.2-2' }}
                            </td>
                            <td class="p-4 text-right font-bold" [class.text-rose-600]="item.debt > 0" [class.text-emerald-600]="item.debt <= 0">
                                \${{ item.debt | number:'1.2-2' }}
                            </td>
                            <td class="p-4">
                                @if (item.debt > 0) {
                                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                                        Owing
                                    </span>
                                } @else {
                                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        Clear
                                    </span>
                                }
                            </td>
                        </tr>
                    } @empty {
                        <tr>
                            <td colspan="8" class="p-8 text-center text-gray-400">
                                No active stays found.
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  `
})
export class DailyOverviewComponent {
    data = inject(DataService);
    today = new Date();

    totalOutstanding = computed(() => {
        let sum = 0;
        for (const item of this.data.activeStaysWithDebt()) {
            if (item.debt > 0) sum += item.debt;
        }
        return sum;
    });

    debtorsCount = computed(() => {
        return this.data.activeStaysWithDebt().filter(item => item.debt > 0).length;
    });

    checkoutsToday = computed(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        return this.data.activeStaysWithDebt().filter(item =>
            item.stay.checkOutProjected.startsWith(todayStr)
        ).length;
    });
}