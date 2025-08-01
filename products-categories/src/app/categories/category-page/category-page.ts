declare var bootstrap: any;

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryList } from '../category-list/category-list';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, CategoryList, CategoryForm],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css'
})
export class CategoryPage implements OnInit, AfterViewInit {
  categories: any[] = [];
  selectedCategory: any = null;

  @ViewChild('categoryModalRef') categoryModalRef!: ElementRef;
  modalInstance: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.categoryModalRef.nativeElement);
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  onCategorySaved(): void {
    this.modalInstance.hide();            
    this.loadCategories();                
    this.selectedCategory = null;         
  }

  openModalForNew(): void {
    this.selectedCategory = null;
    this.modalInstance.show();            
  }

  editCategory(cat: any) {
    this.selectedCategory = { ...cat };
    this.modalInstance.show();            
  }

  deleteCategory(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  }
}
