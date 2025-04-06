import { ProductService } from './../services/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class AllProductsComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}

  users: any[] = [];
  newusers: any[] = [];
  paginatedUsers: any[] = [];

  pageIndex: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this._ProductService.getallProducts().subscribe({
      next: (res) => {
        this.users = res.data;
        this.newusers = this.users.filter((user) => user.confirmed === true);
        this.updatePaginatedUsers();
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

  remove(id: number) {
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
}
