import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit, OnChanges {
  @Input() productToEdit: any = null;
  @Output() productSaved = new EventEmitter<void>();

  product: {
    id?: number;
    name: string;
    description: string;
    price: number;
    categoryId: number | null;
  } = {
    name: '',
    description: '',
    price: 0,
    categoryId: null
  };

  categories: any[] = [];
  editing = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.product = { ...this.productToEdit };
      this.editing = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (this.editing && this.product.id !== undefined) {
      this.productService.update(this.product.id, this.product).subscribe(() => {
        this.productSaved.emit();
        this.resetForm(form);
      });
    } else {
      this.productService.create(this.product).subscribe(() => {
        this.productSaved.emit();
        this.resetForm(form);
      });
    }
  }

  resetForm(form: NgForm): void {
    this.product = {
      name: '',
      description: '',
      price: 0,
      categoryId: null
    };
    this.editing = false;
    form.resetForm(); 
  }
}
