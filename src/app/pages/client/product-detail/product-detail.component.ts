import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: any;

  products: any;

  activeTab: number = 0;

  changeTab(index: number) {
    this.activeTab = index;
  }

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
      });
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
