import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ShortIdPipe } from '../pipes/short-id.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ShortIdPipe],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  categories = signal<any[]>([]);
  newCategory = signal<{ name: string; icon: string }>({ name: '', icon: '' });
  editCategory = signal<any | null>(null);
  showModal = signal<boolean>(false);
  errorMessage = signal<string>('');
  showIconDropdown = signal<boolean>(false);

  availableIcons = [
    { value: 'fa-home', label: 'Home' },
    { value: 'fa-book', label: 'Book' },
    { value: 'fa-shopping-cart', label: 'Shopping Cart' },
    { value: 'fa-coffee', label: 'Coffee' },
    { value: 'fa-bicycle', label: 'Bicycle' },
    { value: 'fa-car', label: 'Car' },
    { value: 'fa-camera', label: 'Camera' },
    { value: 'fa-film', label: 'Film' },
    { value: 'fa-music', label: 'Music' },
    { value: 'fa-paint-brush', label: 'Paint Brush' },
    { value: 'fa-gamepad', label: 'Gamepad' },
    { value: 'fa-laptop', label: 'Laptop' },
    { value: 'fa-mobile-alt', label: 'Mobile' },
    { value: 'fa-headphones', label: 'Headphones' },
    { value: 'fa-rocket', label: 'Rocket' }
  ];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  
  get selectedIconLabel(): string {
    const selectedIcon = this.availableIcons.find(icon => icon.value === this.newCategory().icon);
    return selectedIcon ? selectedIcon.label : 'Select an icon';
  }

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
    this.showIconDropdown.set(false);
  }

  closeModal() {
    this.showModal.set(false);
    this.errorMessage.set('');
    this.showIconDropdown.set(false);
  }

  toggleIconDropdown() {
    this.showIconDropdown.set(!this.showIconDropdown());
  }

  selectIcon(icon: string) {
    this.newCategory.update(current => ({ ...current, icon }));
    this.showIconDropdown.set(false);
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
