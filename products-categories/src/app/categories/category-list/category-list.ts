import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})

export class CategoryList {
  @Input() categories: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();

  editCategory(category: any) {
    this.onEdit.emit(category);
  }

  deleteCategory(id: number) {
    this.onDelete.emit(id);
  }
}
