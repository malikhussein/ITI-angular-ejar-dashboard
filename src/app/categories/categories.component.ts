import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  categories = signal<any[]>([]);
  newCategory = signal<{ name: string; icon: string }>({ name: '', icon: '' });
  editCategory = signal<any | null>(null);
  showModal = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: () => {
        this.categories.set([]);
        this.toastr.error('Failed to load categories');
      }
    });
  }

  openAddModal() {
    this.newCategory.set({ name: '', icon: '' });
    this.showModal.set(true);
    this.errorMessage.set('');
  }

  closeModal() {
    this.showModal.set(false);
    this.errorMessage.set('');
  }

  validateCategory(category: { name: string; icon: string }): string | null {
    if (!category.name || category.name.trim().length < 3)
      return 'Category name must be at least 3 characters';
    if (category.name.trim().length > 40)
      return 'Category name cannot exceed 40 characters';
    if (!category.icon)
      return 'Category icon is required';
    return null;
  }

  addCategory() {
    const category = this.newCategory();
    const error = this.validateCategory(category);
    if (error) {
      this.errorMessage.set(error);
      this.toastr.warning(error);
      return;
    }

    this.categoryService.addCategory(category).subscribe({
      next: () => {
        this.loadCategories();
        this.closeModal();
        this.toastr.success('Category added successfully');
      },
      error: (err) => {
        const message = err?.error?.message || 'Error adding category';
        this.toastr.error(message);
      }
    });
  }

  startEdit(category: any) {
    this.editCategory.set({ ...category });
  }

  updateCategory() {
    const category = this.editCategory();
    const error = this.validateCategory(category);
    if (error) {
      this.toastr.warning(error);
      return;
    }

    this.categoryService.updateCategory(category._id, {
      name: category.name,
      icon: category.icon
    }).subscribe({
      next: () => {
        this.loadCategories();
        this.editCategory.set(null);
        this.toastr.success('Category updated successfully');
      },
      error: (err) => {
        const message = err?.error?.message || 'Error updating category';
        this.toastr.error(message);
      }
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
          this.toastr.success('Category deleted');
        },
        error: () => {
          this.toastr.error('Error deleting category');
        }
      });
    }
  }
}
