import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent {
  categories: any[] = [];

  category: any;

  p: number = 1;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.data;
    });
  }

  getCate(id: string) {
    this.categoryService.getCategories(id).subscribe((data) => {
      this.category = data.data;
    });
  }

  removeCategories(id: string) {
    this.categoryService.removeCategories(id).subscribe((res) => {
      console.log(res);
    });
  }
}
