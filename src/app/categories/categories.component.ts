import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ShortIdPipe } from '../pipes/short-id.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ShortIdPipe,LoaderComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  categories = signal<any[]>([]);
  newCategory = signal<{ name: string; icon: string }>({ name: '', icon: '' });
  editCategory = signal<any | null>(null);
  showAddModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  categoryToDelete = signal<string | null>(null);
  showIconDropdown = signal<boolean>(false);
  loading = signal<boolean>(true); // for shared loader

  

  availableIcons = [
    { value: 'fa-home', label: 'Home' },
    { value: 'fa-book', label: 'Book' },
    { value: 'fa-bicycle', label: 'Bicycle' },
    { value: 'fa-car', label: 'Car' },
    { value: 'fa-camera', label: 'Camera' },
    { value: 'fa-music', label: 'Music' },
    { value: 'fa-gamepad', label: 'Gamepad' },
    { value: 'fa-laptop', label: 'Laptop' },
    { value: 'fa-mobile-alt', label: 'Mobile' },
    { value: 'fa-headphones', label: 'Headphones' },
  ];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  get selectedIconLabel(): string {
    const selectedIcon = this.availableIcons.find(icon => icon.value === (this.showAddModal() ? this.newCategory().icon : this.editCategory()?.icon));
    return selectedIcon ? selectedIcon.label : 'Select an icon';
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true); //  show loader initially

    this.categoryService.getCategories().subscribe({
      next: (data) =>{ 
        this.categories.set(data)
       this.loading.set(false);}, // hide loader after fetching
      error: () => {
        this.categories.set([]);
        this.toastr.error('Failed to load categories');
        this.loading.set(false); //   hide loader on error

      }
    });
  }

  openAddModal() {
    this.newCategory.set({ name: '', icon: '' });
    this.showAddModal.set(true);
    this.showIconDropdown.set(false);
  }

  closeAddModal() {
    this.showAddModal.set(false);
    this.showIconDropdown.set(false);
  }

  openEditModal(category: any) {
    this.editCategory.set({ ...category });
    this.showEditModal.set(true);
    this.showIconDropdown.set(false);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.editCategory.set(null);
    this.showIconDropdown.set(false);
  }

  toggleIconDropdown() {
    this.showIconDropdown.set(!this.showIconDropdown());
  }

  selectIcon(icon: string) {
    if (this.showAddModal()) {
      this.newCategory.update(current => ({ ...current, icon }));
    } else if (this.showEditModal()) {
      this.editCategory.update(current => ({ ...current, icon }));
    }
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
      this.toastr.warning(error);
      return;
    }

    this.categoryService.addCategory(category).subscribe({
      next: () => {
        this.loadCategories();
        this.closeAddModal();
        this.toastr.success('Category added successfully');
      },
      error: (err) => {
        const message = err?.error?.message || 'Error adding category';
        this.toastr.error(message);
      }
    });
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
        this.closeEditModal();
        this.toastr.success('Category updated successfully');
      },
      error: (err) => {
        const message = err?.error?.message || 'Error updating category';
        this.toastr.error(message);
      }
    });
  }

  openDeleteModal(id: string) {
    this.categoryToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.categoryToDelete.set(null);
  }

  confirmDelete() {
    const id = this.categoryToDelete();
    if (id) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
          this.toastr.success('Category deleted');
          this.closeDeleteModal();
        },
        error: () => {
          this.toastr.error('Error deleting category');
          this.closeDeleteModal();
        }
      });
    }
  }
}
