import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent {
  categories: any[] = [];

  category: any;

  p: number = 1;
  formCategory = this.fb.group({
    name: ['', [Validators.required]],
    slug: ['', [Validators.required]],
  });
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
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
      this.categoryService.getAllCategories().subscribe((categories) => {
        this.categories = categories.data;
      });
    });
  }
  addCate() {
    const cate = {
      name: this.formCategory.value.name || '',
      slug: this.formCategory.value.slug || '',
    };
    this.categoryService.createCategories(cate).subscribe((data) => {
      this.categoryService.getAllCategories().subscribe((categories) => {
        this.categories = categories.data;
        this.categoryService.getAllCategories().subscribe((categories) => {
          this.categories = categories.data;
        });
      });
    });
  }

  updateCateById(id: any) {
    this.categoryService.getCategories(id).subscribe((data) => {
      this.category = data.data;
      this.formCategory.patchValue({
        name: this.category.name,
        slug: this.category.slug,
      });
    });
  }

  updateCate() {
    const cate = {
      name: this.formCategory.value.name || '',
      slug: this.formCategory.value.slug || '',
    };
    console.log(cate);
    this.categoryService
      .updateCategories(cate, this.category._id)
      .subscribe((data) => {
        this.categoryService.getAllCategories().subscribe((categories) => {
          this.categories = categories.data;
        });
      });
  }
}
