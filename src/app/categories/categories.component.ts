import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';

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
  editCategory = signal<{ _id: string; name: string; icon: string } | null>(null);
  showModal = signal(false);

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => {
        console.error('Error loading categories:', err);
        this.categories.set([]);
      }
    });
  }

  openAddModal() {
    this.newCategory.set({ name: '', icon: '' });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  addCategory() {
    const category = this.newCategory();
    if (category.name && category.icon) {
      this.categoryService.addCategory(category).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (err) => console.error('Error adding category:', err)
      });
    }
  }

  startEdit(category: any) {
    this.editCategory.set({ _id: category._id, name: category.name, icon: category.icon });
  }

  updateCategory() {
    const category = this.editCategory();
    if (category && category._id) {
      this.categoryService.updateCategory(category._id, {
        name: category.name,
        icon: category.icon
      }).subscribe({
        next: () => {
          this.loadCategories();
          this.editCategory.set(null);
        },
        error: (err) => console.error('Error updating category:', err)
      });
    }
  }

  deleteCategory(id: string | number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(String(id)).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (err) => console.error('Error deleting category:', err)
      });
    }
  }
}
