import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent {
  products: any[];

  constructor() {
    this.products = Array(14).fill(0);
  }
}
