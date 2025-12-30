import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialDocument } from '../services/data.service';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:p-0 print:bg-white print:fixed print:inset-0">
      <div class="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:shadow-none print:max-h-full print:w-full print:max-w-none">
        
        <!-- Toolbar (Hidden on Print) -->
        <div class="bg-gray-100 p-4 border-b flex justify-between items-center print:hidden">
          <h2 class="font-bold text-gray-700">Document Viewer</h2>
          <div class="flex gap-2">
            <button (click)="print()" class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              Print / Save PDF
            </button>
            <button (click)="close.emit()" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>

        <!-- Printable Area -->
        <div class="p-8 overflow-y-auto bg-white" id="printable-area">
          @if (document(); as doc) {
            <!-- Header -->
            <div class="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
              <div>
                <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">STAYSYNC OS</h1>
                <p class="text-gray-500 mt-1">123 Luxury Boulevard<br>Metropolis, NY 10012<br>contact@staysyncos.com</p>
              </div>
              <div class="text-right">
                <div class="text-4xl font-black text-gray-200 uppercase tracking-widest">{{ doc.type }}</div>
                <div class="mt-2 text-gray-600 font-medium">#{{ doc.number }}</div>
                <div class="text-sm text-gray-500">{{ doc.date | date:'mediumDate' }}</div>
              </div>
            </div>

            <!-- Bill To -->
            <div class="mb-8">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bill To</h3>
              <div class="text-xl font-bold text-gray-800">{{ doc.guestName }}</div>
              <div class="text-gray-500">Guest ID: {{ doc.guestId }}</div>
            </div>

            <!-- Line Items -->
            <table class="w-full text-left mb-8">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="py-3 font-semibold text-gray-600 text-sm uppercase">Description</th>
                  <th class="py-3 font-semibold text-gray-600 text-sm text-center uppercase">Qty</th>
                  <th class="py-3 font-semibold text-gray-600 text-sm text-right uppercase">Unit Price</th>
                  <th class="py-3 font-semibold text-gray-600 text-sm text-right uppercase">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (item of doc.items; track item.description) {
                  <tr>
                    <td class="py-4 text-gray-800">{{ item.description }}</td>
                    <td class="py-4 text-center text-gray-600">{{ item.quantity }}</td>
                    <td class="py-4 text-right text-gray-600">\${{ item.unitPrice | number:'1.2-2' }}</td>
                    <td class="py-4 text-right font-medium text-gray-900">\${{ item.total | number:'1.2-2' }}</td>
                  </tr>
                }
              </tbody>
            </table>

            <!-- Totals -->
            <div class="flex justify-end mb-12">
              <div class="w-64 space-y-3">
                <div class="flex justify-between text-gray-600 border-t pt-4">
                  <span>Subtotal</span>
                  <span>\${{ doc.totalAmount | number:'1.2-2' }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Taxes (0%)</span>
                  <span>$0.00</span>
                </div>
                <div class="flex justify-between text-2xl font-bold text-gray-900 border-t border-gray-300 pt-4">
                  <span>Total</span>
                  <span>\${{ doc.totalAmount | number:'1.2-2' }}</span>
                </div>
              </div>
            </div>

            <!-- Notes -->
            @if (doc.notes) {
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-600">
                <span class="font-bold">Notes:</span> {{ doc.notes }}
              </div>
            }

            <!-- AI Summary (Only if available) -->
            @if (doc.summary) {
                <div class="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100 print:bg-transparent print:border-gray-200">
                    <div class="flex items-center gap-2 mb-2 text-indigo-800 font-bold text-xs uppercase tracking-wide print:text-gray-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        AI Summary
                    </div>
                    <p class="text-indigo-900 text-sm italic print:text-gray-800">"{{ doc.summary }}"</p>
                    @if (doc.tags && doc.tags.length) {
                        <div class="flex gap-1 mt-2">
                            @for (tag of doc.tags; track tag) {
                                <span class="text-[10px] px-2 py-0.5 bg-white border border-indigo-200 text-indigo-600 rounded-full print:border-gray-300 print:text-gray-600">{{ tag }}</span>
                            }
                        </div>
                    }
                </div>
            }

            <!-- Footer -->
            <div class="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-xs">
              <p>Thank you for choosing StaySyncOS. We hope you enjoyed your stay.</p>
              <p class="mt-1">Generated by StaySyncOS. Copyright Jason Ruiz at JruizDesign.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DocumentViewerComponent {
  document = input.required<FinancialDocument>();
  close = output<void>();

  print() {
    window.print();
  }
}