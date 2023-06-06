import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent {
  products: any[];
  product: any
  p: number = 1;

  constructor(private productsService: ProductsService) {
    this.products = Array(14).fill(0);
    this.productsService.getAllProducts().subscribe(product => {
      this.products = product.data
      console.log(this.products);
    })
  }
  getItemById(id: any) {
    this.productsService.getProduct(id).subscribe(pro => {
      console.log(pro.data);
      this.product = pro.data;
      console.log(this.product);
    })
  }
}
