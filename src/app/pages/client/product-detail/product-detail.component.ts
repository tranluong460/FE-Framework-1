import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommentsService } from '../../../services/comments/comments.service';
import { Router } from '@angular/router';

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
  errorMessage: any;

  cart: any = {
    user: this.user?._id,
    products: [],
    totalPrice: 0,
  };

  commentForm = this.formBuilder.group({
    content: ['', [Validators.required]],
  });

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentsService: CommentsService,
    private navigate: Router
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product.data;
        this.comments = product.data.comments;
      });
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.data;
    });

    // Tạo FormGroup cho cartForm
    this.cartForm = this.formBuilder.group({
      user: [this.user?._id],
      products: this.formBuilder.array([]), // FormArray cho products
      totalPrice: [0],
    });
  }

  // Hàm getter cho thuộc tính products trong cartForm
  get productsFormArray() {
    return this.cartForm.get('products') as FormArray;
  }

  onSubmit() {
    const comment: any = {
      content: this.commentForm.value.content || '',
    };

    this.commentsService.createComment(comment, this.product._id).subscribe(
      (response) => {
        console.log('Response', response);
        this.errorMessage = response.message;
      },
      (error) => {
        console.log('Error', error);
        this.errorMessage = error.error.message;
      }
    );
  }

  addToCart(product: any) {
    const cartData = sessionStorage.getItem('cart');
    this.cartForm.patchValue({
      user: this.user?._id,
    });

    const checkProduct = this.cartForm.value.products.findIndex(
      (prod: any) => prod.product === product._id
    );

    if (checkProduct !== -1) {
      this.cartForm.value.products[checkProduct].quantity += 1;
    } else {
      const newProduct = {
        product: product._id,
        quantity: 1,
        price: product.price,
      };

      this.productsFormArray.push(
        this.formBuilder.group({
          product: [newProduct.product],
          quantity: [newProduct.quantity],
          price: [newProduct.price],
        })
      );
    }

    const totalPrice = this.cartForm.value.products.reduce(
      (total: number, prod: any) => {
        return total + prod.quantity * prod.price;
      },
      0
    );
    this.cartForm.patchValue({
      totalPrice: totalPrice,
    });

    sessionStorage.setItem('cart', JSON.stringify(this.cartForm.value));
    this.navigate.navigate(['/cart']);
  }
}
