import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcessService } from '../services/process.service';
import { ToastrService } from 'ngx-toastr';
import { ShortIdPipe } from '../pipes/short-id.pipe';

@Component({
  selector: 'app-all-process',
  standalone: true,
  imports: [CommonModule, FormsModule, ShortIdPipe],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css',
})
export class AllProcessComponent implements OnInit {
  processes = signal<any[]>([]);
  loading = signal(true);

  showEditModal = signal(false);
  editProcess = signal<any | null>(null);

  showDeleteModal = signal(false);
  processToDelete = signal<string | null>(null);

  constructor(
    private processService: ProcessService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loading.set(true);
    this.processService.getAllProcesses().subscribe({
      next: (data) => {
        this.processes.set(data);
        this.loading.set(false);
      },
    });
  }

  openEditModal(process: any) {
    this.editProcess.set({
      ...process,
      startDate: new Date(process.startDate).toISOString().split('T')[0],
      endDate: new Date(process.endDate).toISOString().split('T')[0],
    });
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.editProcess.set(null);
  }

  updateProcess() {
    const process = this.editProcess();
    if (process) {
      const updatedProcess = {
        productId: process.productId,
        renterId: process.renterId,
        startDate: new Date(process.startDate).toISOString(),
        endDate: new Date(process.endDate).toISOString(),
        status: process.status,
        price: process.price,
      };
      this.processService.updateProcess(process._id, updatedProcess).subscribe({
        next: () => {
          this.loading.set(true);
          this.processService.getAllProcesses().subscribe({
            next: (data) => {
              this.processes.set(data);
              this.loading.set(false);
              this.closeEditModal();
              this.toastr.success('Process updated successfully');
            },
          });
        },
      });
    }
  }

  deleteProcess(id: string) {
    this.processToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.processToDelete.set(null);
  }

  confirmDelete() {
    const id = this.processToDelete();
    if (id) {
      this.processService.deleteProcess(id).subscribe({
        next: () => {
          this.loading.set(true);
          this.processService.getAllProcesses().subscribe({
            next: (data) => {
              this.processes.set(data);
              this.loading.set(false);
              this.toastr.success('Process deleted successfully');
              this.closeDeleteModal();
            },
          });
        },
      });
    }
  }
}
