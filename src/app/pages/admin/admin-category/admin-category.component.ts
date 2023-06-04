import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent {
  categories: any[];

  constructor() {
    this.categories = Array(14).fill(0);
  }
}
