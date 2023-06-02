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
  product: any
 id !: string| any;
  constructor(private poductService: ProductsService,
    private router : ActivatedRoute) {
      this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(typeof(this.id));
    this.poductService.getProduct(this.id).subscribe((product) => {this.items = product
    console.log(product);})
    });
    this.product = Array(6).fill(0);
    this.poductService.getAllProducts().subscribe(data=>{this.product = data
    });
  }
}
