declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from '../product-list/product-list';
import { ProductForm } from '../product-form/product-form';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductList, ProductForm],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})

export class ProductPage implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  onProductSaved(): void {
    this.loadProducts();
    this.selectedProduct = null;
    this.closeModal();
  }

  editProduct(product: any): void {
    this.selectedProduct = product;

    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => this.loadProducts());
    }
  }

  closeModal(): void {
    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }
}