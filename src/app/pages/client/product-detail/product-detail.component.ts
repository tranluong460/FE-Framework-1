import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  items: any;
  product: any;
  id!: string | any;
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(typeof this.id);
      this.productService.getProduct(this.id).subscribe((product) => {
        this.items = product;
      });
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.product = data;
    });
  }
}
