import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: any;

  products: any;

  comments: any;

  activeTab: number = 0;

  commentForm = this.formBuilder.group({
    content: ['', [Validators.required]],
  });

  changeTab(index: number) {
    this.activeTab = index;
  }

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
        this.comments = product.comments;
      });
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSubmit() {
    const comment: any = {
      content: this.commentForm.value.content || '',
    };

    console.log(comment);
  }
}
