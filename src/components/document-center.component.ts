import { Component, inject, signal, computed, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { DataService, StoredDocument } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AiService } from '../services/ai.service';

@Component({
    selector: 'app-document-center',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    template: `
    <div class="p-6 h-full flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Document Center</h1>
          <p class="text-gray-500 text-sm">Secure storage, scanning, and retrieval</p>
        </div>
        <div class="flex gap-3">
            <button (click)="openUploadModal()" class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                Upload File
            </button>
            <button (click)="openScanModal()" class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Scan Doc
            </button>
        </div>
      </div>

      <!-- Controls & Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
             <div>
                <div class="text-xs font-bold text-indigo-800 uppercase">Total Files</div>
                <div class="text-2xl font-bold text-indigo-600">{{ data.storedDocuments().length }}</div>
             </div>
             <svg class="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          
          <div class="md:col-span-3 flex flex-col justify-end">
            <div class="flex flex-wrap gap-2 mb-2 items-center justify-between">
                <div class="flex gap-2">
                    <button *ngFor="let cat of categories" 
                        (click)="filterCategory.set(cat)"
                        class="px-3 py-1 text-xs font-medium rounded-full transition-colors border"
                        [class.bg-gray-800]="filterCategory() === cat" 
                        [class.text-white]="filterCategory() === cat"
                        [class.border-gray-800]="filterCategory() === cat"
                        [class.bg-white]="filterCategory() !== cat"
                        [class.text-gray-600]="filterCategory() !== cat"
                        [class.border-gray-200]="filterCategory() !== cat">
                        {{ cat }}
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll()" id="selectAll" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                    <label for="selectAll" class="text-xs font-medium text-gray-600 cursor-pointer">Select All Visible</label>
                </div>
            </div>
            <div class="relative">
                <input [ngModel]="searchTerm()" (ngModelChange)="searchTerm.set($event)" 
                    type="text" placeholder="Search by document title or tag..." 
                    class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
      </div>

      <!-- Bulk Actions Toolbar -->
      @if (selectedDocIds().size > 0) {
        <div class="mb-6 bg-slate-800 text-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in border border-slate-700">
            <div class="flex items-center gap-3">
                <div class="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                   {{ selectedDocIds().size }}
                </div>
                <span class="font-medium">Documents Selected</span>
            </div>
            <div class="flex gap-2">
                <button (click)="bulkAnalyze()" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                   AI Analyze All
                </button>
                <button (click)="bulkDelete()" class="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                   Delete Selected
                </button>
                <button (click)="clearSelection()" class="px-3 py-2 text-slate-400 hover:text-white transition text-sm">
                   Cancel
                </button>
            </div>
        </div>
      }

      <!-- Categorized Document List -->
      <div class="bg-gray-50 rounded-xl border border-gray-200 flex-1 overflow-y-auto p-6 space-y-8">
        @for (group of displayGroups(); track group.category) {
            <div class="animate-fade-in">
                <div class="flex items-center gap-3 mb-4">
                    <h2 class="text-sm font-bold text-gray-500 uppercase tracking-wider">{{ group.category }}</h2>
                    <div class="h-px bg-gray-200 flex-1"></div>
                    <span class="text-xs text-gray-400">{{ group.docs.length }} files</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    @for (doc of group.docs; track doc.id) {
                        <div class="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-all group relative flex flex-col h-full"
                            [class.border-indigo-500]="selectedDocIds().has(doc.id)"
                            [class.ring-2]="selectedDocIds().has(doc.id)"
                            [class.ring-indigo-200]="selectedDocIds().has(doc.id)"
                            [class.border-gray-200]="!selectedDocIds().has(doc.id)">
                            
                            <!-- Selection Checkbox -->
                            <div class="absolute top-2 left-2 z-20" (click)="$event.stopPropagation()">
                                <input type="checkbox" [checked]="selectedDocIds().has(doc.id)" (change)="toggleSelection(doc.id)"
                                class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white/90">
                            </div>
        
                            <!-- Thumbnail / Icon (Masked) -->
                            <div class="h-32 bg-gray-50 flex items-center justify-center overflow-hidden relative shrink-0 cursor-pointer" (click)="viewDoc.set(doc)">
                                <div class="flex flex-col items-center justify-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                                    <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    <span class="text-[10px] uppercase font-bold tracking-wider opacity-60">Click to View</span>
                                </div>
                                
                                <!-- Actions Overlay -->
                                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                                     (click)="$event.stopPropagation()">
                                     <button (click)="viewDoc.set(doc)" class="p-2 bg-white rounded-full text-gray-800 hover:text-indigo-600 transition-colors" title="View Securely">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                     </button>
                                     <a [href]="doc.data" [download]="doc.title" class="p-2 bg-white rounded-full text-gray-800 hover:text-indigo-600 transition-colors" title="Download">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                     </a>
                                     <button (click)="deleteDoc(doc.id)" class="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors" title="Delete">
                                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                     </button>
                                </div>
                            </div>
                            
                            <!-- Info -->
                            <div class="p-3 flex-1 flex flex-col cursor-pointer" (click)="toggleSelection(doc.id)">
                                <div class="flex justify-between items-start mb-1">
                                    <span class="text-[10px] text-gray-400">{{ doc.uploadedAt | date:'shortDate' }}</span>
                                </div>
                                <h3 class="font-medium text-gray-800 truncate text-sm mb-1 hover:text-indigo-600 transition-colors" [title]="doc.title" (click)="viewDoc.set(doc); $event.stopPropagation()">{{ doc.title }}</h3>
                                
                                <!-- AI Tags -->
                                <div class="flex flex-wrap gap-1 mb-2">
                                    @for (tag of doc.tags.slice(0, 3); track tag) {
                                        <span class="text-[10px] bg-gray-100 text-gray-500 px-1 rounded">{{ tag }}</span>
                                    }
                                </div>
        
                                <!-- AI Summary -->
                                @if (doc.summary) {
                                   <p class="text-xs text-gray-500 line-clamp-2 mt-auto italic" title="{{doc.summary}}">"{{ doc.summary }}"</p>
                                }
        
                                <div class="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">By {{ doc.uploadedBy }}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        } @empty {
            <div class="flex flex-col items-center justify-center py-12 text-gray-400 h-full">
                <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
                <p>No documents found matching your filters.</p>
                @if (searchTerm()) {
                    <button (click)="searchTerm.set('')" class="mt-2 text-indigo-500 text-sm hover:underline">Clear Search</button>
                }
            </div>
        }
      </div>

      <!-- Upload Modal -->
      @if (showUploadModal()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
                <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-gray-800">Upload Document</h3>
                    <button (click)="showUploadModal.set(false)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form [formGroup]="uploadForm" (ngSubmit)="submitUpload()" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                        <input formControlName="title" type="text" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select formControlName="category" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white">
                            <option *ngFor="let cat of categories.slice(1)" [value]="cat">{{ cat }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Related Guest (Optional)</label>
                        <select formControlName="guestId" class="w-full border border-gray-300 rounded-lg p-2.5 bg-white">
                            <option value="">None</option>
                            @for (guest of data.guests(); track guest.id) {
                                <option [value]="guest.id">{{ guest.name }}</option>
                            }
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">File</label>
                        <input type="file" (change)="onFileSelected($event)" class="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                    </div>
                    
                    <div class="bg-indigo-50 p-3 rounded text-xs text-indigo-700 flex gap-2">
                       <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                       <p>Gemini will automatically analyze this document to generate tags, a summary, and verify the category.</p>
                    </div>

                    <div class="flex justify-end pt-2 gap-3">
                         <button type="button" (click)="showUploadModal.set(false)" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                         <button type="submit" [disabled]="uploadForm.invalid || !selectedFileBase64" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">Upload</button>
                    </div>
                </form>
             </div>
        </div>
      }

      <!-- Camera Scan Modal -->
      @if (showScanModal()) {
          <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
               <div class="bg-black rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in border border-gray-800 flex flex-col max-h-[90vh]">
                  <div class="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                      <h3 class="font-bold text-white flex items-center gap-2">
                        <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Document Scanner
                      </h3>
                      <button (click)="closeScanModal()" class="text-gray-400 hover:text-white">&times;</button>
                  </div>
                  
                  <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                      <video #videoElement autoplay playsinline class="w-full h-full object-contain"></video>
                      <canvas #canvasElement class="hidden"></canvas>
                      
                      <!-- Overlay Guide -->
                      <div class="absolute inset-0 border-2 border-indigo-500/50 pointer-events-none m-8 rounded-lg flex items-center justify-center">
                          <div class="text-white/50 text-sm bg-black/50 px-3 py-1 rounded">Align document here</div>
                      </div>
                  </div>

                  <div class="p-6 bg-gray-900 flex justify-between items-center">
                     @if (!cameraError) {
                        <div class="flex flex-col">
                           <label class="text-xs text-gray-400 mb-1">Save As</label>
                           <input [(ngModel)]="scanTitle" type="text" class="bg-gray-800 border border-gray-700 text-white text-sm rounded px-3 py-1 w-48 focus:border-indigo-500 outline-none" placeholder="Scanned Doc">
                        </div>
                        <button (click)="captureImage()" class="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/20 transition-colors">
                            <div class="w-12 h-12 bg-white rounded-full"></div>
                        </button>
                        <div class="w-48 text-right text-xs text-gray-500">
                            High Quality<br>JPEG Format
                        </div>
                     } @else {
                        <div class="text-rose-400 w-full text-center">
                            {{ cameraError }}
                            <button (click)="startCamera()" class="ml-2 underline text-white">Retry</button>
                            <button (click)="simulateScan()" class="ml-4 bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">Simulate Scan</button>
                        </div>
                     }
                  </div>
               </div>
          </div>
      }

    <!-- Secure View Modal -->
    @if (viewDoc()) {
        <div class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" (click)="viewDoc.set(null)">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]" (click)="$event.stopPropagation()">
                <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 class="font-bold text-gray-800">{{ viewDoc()?.title }}</h3>
                        <p class="text-xs text-gray-500">Secure Viewer • {{ viewDoc()?.category }}</p>
                    </div>
                    <button (click)="viewDoc.set(null)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div class="flex-1 bg-gray-100 overflow-auto p-4 flex items-center justify-center">
                     @if (viewDoc()?.fileType?.startsWith('image/')) {
                         <img [src]="viewDoc()?.data" class="max-w-full max-h-full object-contain shadow-lg">
                     } @else {
                         <div class="text-center">
                            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <p class="text-gray-500">Preview not available for this file type.</p>
                            <a [href]="viewDoc()?.data" [download]="viewDoc()?.title" class="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Download to View</a>
                         </div>
                     }
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
export class DocumentCenterComponent implements OnDestroy {
    data = inject(DataService);
    auth = inject(AuthService);
    ai = inject(AiService);
    fb = inject(FormBuilder);

    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

    categories: string[] = ['All', 'ID', 'Contract', 'Invoice', 'Report', 'Other'];
    filterCategory = signal('All');
    searchTerm = signal('');

    groupedDocuments = computed(() => {
        const docs = this.data.storedDocuments();
        const term = this.searchTerm().toLowerCase();

        let filtered = docs;
        if (term) {
            filtered = docs.filter(d =>
                d.title.toLowerCase().includes(term) ||
                d.tags.some(t => t.toLowerCase().includes(term))
            );
        }

        const groups: Record<string, StoredDocument[]> = {};
        // Initialize groups
        this.categories.slice(1).forEach(c => groups[c] = []); // IDs, Contracts etc
        groups['Other'] = []; // Ensure Other exists

        filtered.forEach(d => {
            const cat = this.categories.includes(d.category) ? d.category : 'Other';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(d);
        });

        // Remove empty groups if not searching, or keep them? 
        // Let's return list of { category: string, docs: StoredDocument[] }
        return Object.entries(groups)
            .map(([category, docs]) => ({ category, docs }))
            .filter(g => g.docs.length > 0 || (term === '' && this.filterCategory() === 'All'));
        // Simplified: just return all non-empty for now
    });

    displayGroups = computed(() => {
        const allGroups = this.groupedDocuments();
        const activeCat = this.filterCategory();

        if (activeCat === 'All') return allGroups.filter(g => g.docs.length > 0);
        return allGroups.filter(g => g.category === activeCat);
    });

    selectedDocIds = signal<Set<string>>(new Set());
    viewDoc = signal<StoredDocument | null>(null);

    // Upload State
    showUploadModal = signal(false);
    uploadForm: FormGroup;
    selectedFileBase64: string | null = null;
    selectedFileType: string = '';

    // Scan State
    showScanModal = signal(false);
    scanTitle = 'Scanned Document';
    mediaStream: MediaStream | null = null;
    cameraError: string | null = null;

    constructor() {
        this.uploadForm = this.fb.group({
            title: ['', Validators.required],
            category: ['Other', Validators.required],
            guestId: ['']
        });
    }

    // Toggle logic
    toggleSelection(docId: string) {
        this.selectedDocIds.update(set => {
            const newSet = new Set(set);
            if (newSet.has(docId)) newSet.delete(docId);
            else newSet.add(docId);
            return newSet;
        });
    }

    isAllSelected() {
        const hasDocs = this.filteredDocs().length > 0;
        return hasDocs && this.filteredDocs().every(d => this.selectedDocIds().has(d.id));
    }

    toggleSelectAll() {
        if (this.isAllSelected()) {
            this.selectedDocIds.set(new Set());
        } else {
            const allIds = this.filteredDocs().map(d => d.id);
            this.selectedDocIds.set(new Set(allIds));
        }
    }

    filteredDocs() {
        // Flatten displayGroups for legacy checkbox logic if needed, or update logic
        // For simple select all, we can just grab everything from filtered list
        return this.displayGroups().flatMap(g => g.docs);
    }

    clearSelection() {
        this.selectedDocIds.set(new Set());
    }

    // Actions
    bulkDelete() {
        const ids = Array.from(this.selectedDocIds());
        if (!confirm(`Delete ${ids.length} documents?`)) return;

        ids.forEach(id => this.data.deleteDocument(id));
        this.clearSelection();
    }

    async bulkAnalyze() {
        alert('AI Bulk Analysis started... (Implementation pending)');
    }

    deleteDoc(id: string) {
        if (confirm('Delete this document?')) {
            this.data.deleteDocument(id);
        }
    }

    // Upload Logic
    openUploadModal() {
        this.showUploadModal.set(true);
        this.selectedFileBase64 = null;
        this.uploadForm.reset({ category: 'Other', title: '' });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        this.selectedFileType = file.type;
        const reader = new FileReader();
        reader.onload = () => {
            this.selectedFileBase64 = reader.result as string;
            // Auto-fill title if empty
            if (!this.uploadForm.get('title')?.value) {
                this.uploadForm.patchValue({ title: file.name });
            }
        };
        reader.readAsDataURL(file);
    }

    async submitUpload() {
        if (this.uploadForm.invalid || !this.selectedFileBase64) return;

        const formVal = this.uploadForm.value;

        // Optimistic UI or wait?
        this.data.uploadDocument({
            title: formVal.title,
            category: formVal.category,
            uploadedBy: this.auth.currentUser()?.username || 'Unknown',
            fileType: this.selectedFileType,
            data: this.selectedFileBase64,
            guestId: this.uploadForm.get('guestId')?.value || undefined,
            tags: []
        });

        // Trigger AI analysis in background
        // this.performAnalysis(this.selectedFileBase64); // Todo: get ID of new doc

        this.showUploadModal.set(false);
    }

    // Camera Logic
    async openScanModal() {
        this.showScanModal.set(true);
        this.scanTitle = 'Scanned Document';
        await this.startCamera();
    }

    async startCamera() {
        this.cameraError = null;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            this.mediaStream = stream;
            if (this.videoElement) {
                this.videoElement.nativeElement.srcObject = stream;
            }
        } catch (err) {
            console.error(err);
            this.cameraError = 'Could not access camera. Please allow permissions.';
        }
    }

    captureImage() {
        if (!this.videoElement || !this.canvasElement) return;

        const video = this.videoElement.nativeElement;
        const canvas = this.canvasElement.nativeElement;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);

        const base64 = canvas.toDataURL('image/jpeg', 0.8);

        // Save
        this.data.uploadDocument({
            title: this.scanTitle,
            category: 'Other',
            uploadedBy: this.auth.currentUser()?.username || 'Scanner',
            fileType: 'image/jpeg',
            data: base64,
            tags: ['scanned']
        });

        this.closeScanModal();
    }

    simulateScan() {
        // Mock scan
        this.data.uploadDocument({
            title: 'Simulated Scan ' + new Date().toLocaleTimeString(),
            category: 'Other',
            uploadedBy: 'Simulated Scanner',
            fileType: 'image/fake',
            data: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // Gray pixel
            tags: ['simulated']
        });
        this.closeScanModal();
    }

    closeScanModal() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(t => t.stop());
            this.mediaStream = null;
        }
        this.showScanModal.set(false);
    }

    ngOnDestroy() {
        this.closeScanModal(); // Cleanup camera
    }
}