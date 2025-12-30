import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 h-full flex flex-col">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">System Logs</h1>
          <p class="text-gray-500 text-sm">Real-time audit trail of all user actions</p>
        </div>
        
        <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <select [ngModel]="filterCategory()" (ngModelChange)="filterCategory.set($event)" class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
            <option value="All">All Categories</option>
            <option value="System">System</option>
            <option value="Guest">Guest</option>
            <option value="Finance">Finance</option>
            <option value="Room">Room</option>
            <option value="Staff">Staff</option>
          </select>
          
          <input [ngModel]="searchTerm()" (ngModelChange)="searchTerm.set($event)" type="text" placeholder="Search details..." 
            class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64">
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div class="overflow-y-auto flex-1">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse min-w-[650px]">
              <thead class="bg-gray-50 text-gray-500 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th class="p-4 font-medium w-48">Timestamp</th>
                  <th class="p-4 font-medium w-32">Category</th>
                  <th class="p-4 font-medium w-32">User</th>
                  <th class="p-4 font-medium w-48">Action</th>
                  <th class="p-4 font-medium">Details</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (log of filteredLogs(); track log.id) {
                  <tr class="hover:bg-gray-50 transition-colors font-mono text-xs md:text-sm animate-fade-in">
                    <td class="p-4 text-gray-500 whitespace-nowrap">{{ log.timestamp | date:'medium' }}</td>
                    <td class="p-4">
                      <span class="px-2 py-1 rounded-full text-xs font-semibold border"
                        [class.bg-gray-100]="log.category === 'System'" [class.text-gray-700]="log.category === 'System'" [class.border-gray-200]="log.category === 'System'"
                        [class.bg-emerald-50]="log.category === 'Finance'" [class.text-emerald-700]="log.category === 'Finance'" [class.border-emerald-200]="log.category === 'Finance'"
                        [class.bg-amber-50]="log.category === 'Guest'" [class.text-amber-700]="log.category === 'Guest'" [class.border-amber-200]="log.category === 'Guest'"
                        [class.bg-indigo-50]="log.category === 'Room'" [class.text-indigo-700]="log.category === 'Room'" [class.border-indigo-200]="log.category === 'Room'"
                        [class.bg-purple-50]="log.category === 'Staff'" [class.text-purple-700]="log.category === 'Staff'" [class.border-purple-200]="log.category === 'Staff'"
                      >
                        {{ log.category }}
                      </span>
                    </td>
                    <td class="p-4 text-gray-700 font-medium">{{ log.user }}</td>
                    <td class="p-4 text-gray-900">{{ log.action }}</td>
                    <td class="p-4 text-gray-600 break-words max-w-xs md:max-w-md">{{ log.details }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="p-8 text-center text-gray-400">No logs found matching your criteria.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
        <div class="p-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center flex justify-between px-6">
            <span>Showing {{ filteredLogs().length }} records</span>
            <span>Real-time connected</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
  `]
})
export class LogsComponent {
  data = inject(DataService);
  
  filterCategory = signal('All');
  searchTerm = signal('');

  filteredLogs = computed(() => {
    const logs = this.data.logs();
    const cat = this.filterCategory();
    const term = this.searchTerm().toLowerCase();

    return logs.filter(l => {
      const matchCat = cat === 'All' || l.category === cat;
      const matchTerm = !term || 
        l.action.toLowerCase().includes(term) || 
        l.details.toLowerCase().includes(term) ||
        l.user.toLowerCase().includes(term);
      return matchCat && matchTerm;
    });
  });
}