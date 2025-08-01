import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm implements OnChanges {
  @Input() categoryToEdit: any = null;
  @Output() categorySaved = new EventEmitter<void>();

  category: {
    id?: number;
    name: string;
    description: string;
  } = {
    name: '',
    description: ''
  };

  editing = false;

  constructor(private categoryService: CategoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryToEdit'] && this.categoryToEdit) {
      this.category = { ...this.categoryToEdit };
      this.editing = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (this.editing && this.category.id !== undefined) {
      this.categoryService.update(this.category.id, this.category).subscribe(() => {
        this.categorySaved.emit();
        this.resetForm(form);
      });
    } else {
      this.categoryService.create(this.category).subscribe(() => {
        this.categorySaved.emit();
        this.resetForm(form);
      });
    }
  }

  resetForm(form: NgForm): void {
    this.category = {
      name: '',
      description: ''
    };
    this.editing = false;
    form.resetForm();
  }
}
