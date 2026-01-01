import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService, FinancialDocument } from '../services/data.service';
import { DocumentViewerComponent } from './document-viewer.component';

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DocumentViewerComponent],
  template: `
    <div class="p-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-gray-800">Financial Overview</h1>
        <div class="flex gap-2 w-full md:w-auto">
           <button (click)="openPaymentModal()" class="w-full md:w-auto flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              Record Payment
           </button>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
          <h3 class="text-emerald-800 font-semibold">Total Revenue (All Time)</h3>
          <p class="text-3xl font-bold text-emerald-600 mt-2">\${{ totalRevenue() | number:'1.0-0' }}</p>
        </div>
        <div class="bg-rose-50 border border-rose-100 p-6 rounded-xl">
          <h3 class="text-rose-800 font-semibold">Outstanding Debt</h3>
          <p class="text-3xl font-bold text-rose-600 mt-2">\${{ totalDebt() | number:'1.0-0' }}</p>
        </div>
         <div class="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
          <h3 class="text-indigo-800 font-semibold">Documents Generated</h3>
          <p class="text-3xl font-bold text-indigo-600 mt-2">{{ data.documents().length }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Transactions Feed -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-[500px] flex flex-col">
            <div class="p-4 border-b border-gray-100 bg-gray-50">
            <h3 class="font-semibold text-gray-800">Recent Transactions</h3>
            </div>
            <div class="overflow-y-auto flex-1 divide-y divide-gray-100">
            @for (log of financialLogs(); track log.id) {
                <div class="p-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                    <div class="font-medium text-gray-900 text-sm md:text-base">{{ log.details }}</div>
                    <div class="text-xs text-gray-500">{{ log.timestamp | date:'medium' }}</div>
                </div>
                <div class="text-emerald-600 font-bold text-sm whitespace-nowrap ml-2">+ Payment</div>
                </div>
            } @empty {
                <div class="p-8 text-center text-gray-400">No recent financial records.</div>
            }
            </div>
        </div>

        <!-- Documents List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-[500px] flex flex-col">
            <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 class="font-semibold text-gray-800">Invoices & Receipts</h3>
                <span class="text-xs text-gray-500">Click to view</span>
            </div>
            <div class="overflow-y-auto flex-1 divide-y divide-gray-100">
                @for (doc of data.documents(); track doc.id) {
                    <div (click)="viewDocument(doc)" class="p-4 flex justify-between items-center hover:bg-indigo-50 cursor-pointer transition-colors group">
                        <div class="flex items-center gap-3 overflow-hidden">
                            <div class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-white border border-gray-200 text-gray-500">
                                @if (doc.type === 'Invoice') {
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                } @else {
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                                }
                            </div>
                            <div class="truncate">
                                <div class="font-medium text-gray-900 truncate">{{ doc.type }} #{{ doc.number }}</div>
                                <div class="text-xs text-gray-500 truncate">{{ doc.guestName }} • {{ doc.date | date:'shortDate' }}</div>
                            </div>
                        </div>
                        <div class="text-right pl-2 shrink-0">
                            <div class="font-bold text-gray-800">\${{ doc.totalAmount | number:'1.0-0' }}</div>
                            <button class="text-xs text-indigo-600 hover:underline">View</button>
                        </div>
                    </div>
                } @empty {
                     <div class="p-8 text-center text-gray-400">No documents generated yet.</div>
                }
            </div>
        </div>
      </div>

      <!-- Payment Modal -->
      @if (showPaymentModal()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 class="font-bold text-gray-800">Record Payment</h3>
              <button (click)="showPaymentModal.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form [formGroup]="paymentForm" (ngSubmit)="submitPayment()" class="p-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Guest (Room)</label>
                <select formControlName="stayId" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                    <option value="" disabled>Select a guest...</option>
                    @for (item of data.activeStaysWithDebt(); track item.stay.id) {
                        <option [value]="item.stay.id">
                            {{ item.guest?.name }} (Room {{ item.room?.number }}) - Owed: \${{ item.debt }}
                        </option>
                    }
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500">$</span>
                    <input formControlName="amount" type="number" step="0.01" class="w-full border border-gray-300 rounded p-2 pl-6 focus:ring-2 focus:ring-emerald-500 outline-none">
                </div>
              </div>
              <div class="flex justify-end pt-2">
                <button type="button" (click)="showPaymentModal.set(false)" class="mr-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" [disabled]="paymentForm.invalid" class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50">Process Payment</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Document Viewer Modal -->
      @if (selectedDoc()) {
          <app-document-viewer [document]="selectedDoc()!" (close)="selectedDoc.set(null)"></app-document-viewer>
      }
    </div>
  `
})
export class AccountingComponent {
  data = inject(DataService);
  fb = inject(FormBuilder);

  selectedDoc = signal<FinancialDocument | null>(null);
  showPaymentModal = signal(false);

  paymentForm: FormGroup = this.fb.group({
    stayId: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]]
  });

  totalRevenue() {
    let total = 0;
    for (const s of this.data.stays()) {
      total += (s.totalPaid || 0);
    }
    return total;
  }

  totalDebt() {
    let total = 0;
    for (const s of this.data.activeStaysWithDebt()) {
      total += (s.debt || 0);
    }
    return total;
  }

  financialLogs() {
    return this.data.logs().filter(l => l.category === 'Finance');
  }

  viewDocument(doc: FinancialDocument) {
    this.selectedDoc.set(doc);
  }

  openPaymentModal() {
    this.paymentForm.reset({ stayId: '', amount: '' });
    this.showPaymentModal.set(true);
  }

  async submitPayment() {
    if (this.paymentForm.valid) {
      const { stayId, amount } = this.paymentForm.value;
      const doc = await this.data.makePayment(stayId, parseFloat(amount));

      this.showPaymentModal.set(false);
      if (doc) {
        this.selectedDoc.set(doc);
      }
    }
  }
}