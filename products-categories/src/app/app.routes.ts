import { Routes } from '@angular/router';
import { ProductPage } from './products/product-page/product-page';
import { CategoryPage } from './categories/category-page/category-page';

export const routes: Routes = [
  { path: 'products', component: ProductPage },
  { path: 'categories', component: CategoryPage },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];