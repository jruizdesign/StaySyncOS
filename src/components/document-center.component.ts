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

      <!-- Document Grid -->
      <div class="bg-gray-50 rounded-xl border border-gray-200 flex-1 overflow-y-auto p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (doc of filteredDocs(); track doc.id) {
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

                    <!-- Preview -->
                    <div class="h-32 bg-gray-100 flex items-center justify-center overflow-hidden relative shrink-0">
                        @if (doc.fileType.startsWith('image/')) {
                            <img [src]="doc.data" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity">
                        } @else {
                            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        }
                        
                        <!-- Actions Overlay (Only if not selected to avoid confusion, or keep both) -->
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                             [class.hidden]="selectedDocIds().has(doc.id)"> <!-- Hide overlay if selected so checkbox is clear context -->
                             <a [href]="doc.data" [download]="doc.title" class="p-2 bg-white rounded-full text-gray-800 hover:text-indigo-600 transition-colors" title="Download">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                             </a>
                             <button (click)="deleteDoc(doc.id)" class="p-2 bg-white rounded-full text-gray-800 hover:text-rose-600 transition-colors" title="Delete">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                             </button>
                        </div>
                    </div>
                    
                    <!-- Info -->
                    <div class="p-3 flex-1 flex flex-col cursor-pointer" (click)="toggleSelection(doc.id)">
                        <div class="flex justify-between items-start mb-1">
                            <span class="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{{ doc.category }}</span>
                            <span class="text-[10px] text-gray-400">{{ doc.uploadedAt | date:'shortDate' }}</span>
                        </div>
                        <h3 class="font-medium text-gray-800 truncate text-sm mb-1" [title]="doc.title">{{ doc.title }}</h3>
                        
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
            } @empty {
                <div class="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                    <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
                    <p>No documents found.</p>
                </div>
            }
        </div>
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
  
  // Selection State
  selectedDocIds = signal<Set<string>>(new Set());

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
          category: ['Other', Validators.required]
      });
  }

  ngOnDestroy() {
      this.stopCamera();
  }

  filteredDocs = computed(() => {
      const docs = this.data.storedDocuments();
      const cat = this.filterCategory();
      const term = this.searchTerm().toLowerCase();

      return docs.filter(d => {
          const matchCat = cat === 'All' || d.category === cat;
          const matchTerm = !term || d.title.toLowerCase().includes(term) || d.tags.some(t => t.toLowerCase().includes(term));
          return matchCat && matchTerm;
      });
  });

  // --- Selection Logic ---
  isAllSelected = computed(() => {
    const filtered = this.filteredDocs();
    return filtered.length > 0 && filtered.every(d => this.selectedDocIds().has(d.id));
  });

  toggleSelection(id: string) {
    this.selectedDocIds.update(set => {
        const newSet = new Set(set);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        return newSet;
    });
  }

  toggleSelectAll() {
      const filtered = this.filteredDocs();
      const allSelected = this.isAllSelected();
      
      this.selectedDocIds.update(set => {
          const newSet = new Set(set);
          if (allSelected) {
              filtered.forEach(d => newSet.delete(d.id));
          } else {
              filtered.forEach(d => newSet.add(d.id));
          }
          return newSet;
      });
  }

  clearSelection() {
      this.selectedDocIds.set(new Set());
  }

  async bulkAnalyze() {
      const ids = Array.from(this.selectedDocIds());
      if (ids.length === 0) return;
      
      const docs = this.data.storedDocuments().filter(d => ids.includes(d.id));
      
      if (confirm(`Start AI Analysis for ${docs.length} documents? This may take a moment.`)) {
          this.clearSelection();
          // Process in sequence to avoid rate limits
          for (const doc of docs) {
              await this.performAnalysis(doc);
          }
          alert('Batch analysis complete.');
      }
  }

  bulkDelete() {
      const ids = Array.from(this.selectedDocIds());
      if (ids.length === 0) return;

      if (confirm(`Permanently delete ${ids.length} documents?`)) {
          ids.forEach(id => this.data.deleteDocument(id));
          this.clearSelection();
      }
  }

  // --- Upload Logic ---
  openUploadModal() {
      this.uploadForm.reset({ category: 'Other' });
      this.selectedFileBase64 = null;
      this.showUploadModal.set(true);
  }

  onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          const file = input.files[0];
          
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
              alert('File too large (Max 5MB)');
              input.value = '';
              return;
          }

          this.selectedFileType = file.type;
          const reader = new FileReader();
          reader.onload = (e) => {
              this.selectedFileBase64 = e.target?.result as string;
          };
          reader.readAsDataURL(file);
      }
  }

  async submitUpload() {
      if (this.uploadForm.valid && this.selectedFileBase64) {
          const newDoc = this.data.uploadDocument({
              title: this.uploadForm.get('title')?.value,
              category: this.uploadForm.get('category')?.value,
              uploadedBy: this.auth.currentUser()?.username || 'Unknown',
              fileType: this.selectedFileType,
              data: this.selectedFileBase64,
              tags: []
          });
          
          this.showUploadModal.set(false);

          // AI Analysis (Async)
          this.performAnalysis(newDoc);
      }
  }

  deleteDoc(id: string) {
      if (confirm('Delete this document?')) {
          this.data.deleteDocument(id);
      }
  }

  // --- Scan Logic ---
  openScanModal() {
      this.scanTitle = `Scan ${new Date().toLocaleTimeString()}`;
      this.showScanModal.set(true);
      this.cameraError = null;
      // Wait for view to init
      setTimeout(() => this.startCamera(), 100);
  }

  closeScanModal() {
      this.stopCamera();
      this.showScanModal.set(false);
  }

  async startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
              this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
              if (this.videoElement) {
                  this.videoElement.nativeElement.srcObject = this.mediaStream;
              }
              this.cameraError = null;
          } catch (error) {
              console.error(error);
              this.cameraError = "Could not access camera. Check permissions.";
          }
      } else {
          this.cameraError = "Camera API not supported in this browser.";
      }
  }

  stopCamera() {
      if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(track => track.stop());
          this.mediaStream = null;
      }
  }

  captureImage() {
      if (this.videoElement && this.canvasElement) {
          const video = this.videoElement.nativeElement;
          const canvas = this.canvasElement.nativeElement;
          
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const context = canvas.getContext('2d');
          if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              // Convert to data URL
              const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
              
              // Save
              const newDoc = this.data.uploadDocument({
                  title: this.scanTitle,
                  category: 'Other', // Default for scans
                  uploadedBy: this.auth.currentUser()?.username || 'Scanner',
                  fileType: 'image/jpeg',
                  data: dataUrl,
                  tags: ['scanned']
              });

              this.closeScanModal();
              this.performAnalysis(newDoc);
          }
      }
  }

  simulateScan() {
     // For environments without camera hardware
     const canvas = document.createElement('canvas');
     canvas.width = 640;
     canvas.height = 480;
     const ctx = canvas.getContext('2d');
     if (ctx) {
         ctx.fillStyle = '#f3f4f6';
         ctx.fillRect(0,0,640,480);
         ctx.fillStyle = '#3730a3';
         ctx.font = '30px Arial';
         ctx.fillText('Simulated Scan Document', 150, 240);
         const dataUrl = canvas.toDataURL('image/jpeg');
         
         const newDoc = this.data.uploadDocument({
             title: this.scanTitle + ' (Sim)',
             category: 'Other',
             uploadedBy: this.auth.currentUser()?.username || 'Scanner',
             fileType: 'image/jpeg',
             data: dataUrl,
             tags: ['simulated']
         });
         this.closeScanModal();
         this.performAnalysis(newDoc);
     }
  }

  async performAnalysis(doc: StoredDocument) {
      console.log('Starting AI analysis for', doc.title);
      const analysis = await this.ai.analyzeDocument(doc.data);
      if (analysis && (analysis.tags || analysis.summary)) {
          this.data.updateDocument(doc.id, {
              title: analysis.title || doc.title,
              category: analysis.category as any || doc.category,
              tags: analysis.tags || doc.tags,
              summary: analysis.summary
          });
      }
  }
}