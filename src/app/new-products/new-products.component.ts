import { ProductService } from './../services/product.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { LoaderComponent } from '../loader/loader.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormsModule, LoaderComponent],
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css',
})
export class NewProductsComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}

  users: any[] = [];
  newusers: any[] = [];
  paginatedUsers: any[] = [];

  pageIndex: number = 0;
  pageSize: number = 5;
  // for shared loader
  loading = true;

  showRejectInput: boolean = false;
  rejectReason: string = '';

  @Input() product: any;

  confirmProduct() {
    console.log(this.selectedProduct);

    const updatedData = {
      ...this.selectedProduct,
      confirmed: true,
      confirmMessage: 'Product confirmed by admin',
      status: 'available',
    };
    console.log(updatedData);

    this._ProductService.updateProduct(updatedData).subscribe({
      next: () => {
        this.closeModal();
        this.ngOnInit();
      },
      error: (err) => console.error('Error confirming product:', err),
    });
  }

  rejectProduct() {
    if (!this.rejectReason.trim()) return;

    const updatedData = {
      ...this.selectedProduct,
      confirmed: false,
      confirmMessage: this.rejectReason,
    };

    this._ProductService.updateProduct(updatedData).subscribe({
      next: () => {
        this.showRejectInput = false;
        this.rejectReason = '';
      },
      error: (err) => console.error('Error rejecting product:', err),
    });
  }

  ngOnInit(): void {
    this.loading = true; // show loader initially

    this._ProductService.getallProducts().subscribe({
      next: (res) => {
        this.users = res.data;
        console.log(this.users);

        this.newusers = this.users.filter((user) => user.confirmed !== true);

        this.updatePaginatedUsers();
        this.loading = false; // hide loader after fetching
        console.log(this.newusers);
      },
      //  extra
      error: () => {
        this.loading = false; // hide loader on error
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.newusers.slice(startIndex, endIndex);
  }

  remove(id: string) {
    this._ProductService.removeProduct(id).subscribe({
      next: (res) => {
        this.pageIndex = 0;
        this.ngOnInit();
      },
    });
  }

  move(id: number) {
    window.location.href = `http://localhost:5173/product/${id}`;
  }
  profile(id: number) {
    window.open(`http://localhost:5173/profile/${id}`, '_blank');
  }

  trackById(index: number, item: any) {
    return item.id;
  }
  closeModal() {
    this.selectedProduct = null;
  }

  selectedProduct: any = null;
  mainImage: string = '';
  isEditing: boolean = false;
  isOwner: boolean = false;

  openProductModal(product: any, currentUserId: string) {
    this.selectedProduct = product;

    this.mainImage = product.images[0];
    this.isEditing = false;
    this.isOwner = product.renterId?._id === currentUserId;
  }

  closeProductModal() {
    this.selectedProduct = null;
    this.mainImage = '';
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    // You can add save logic here when saving
  }
}
