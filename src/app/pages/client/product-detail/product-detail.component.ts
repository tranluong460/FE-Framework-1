import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass, CurrencyPipe } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '../../../services/comments/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [CurrencyPipe],
})
export class ProductDetailComponent {
  product: any;
  products: any;
  comments: any;
  activeTab: number = 0;
  errorMessage: any;

  info: any = localStorage.getItem('user');
  user: any = JSON.parse(this.info);

  cart: any = {
    user: '',
    products: [],
    totalPrice: 0,
  };

  commentForm = this.formBuilder.group({
    content: ['', [Validators.required]],
  });

  changeTab(index: number) {
    this.activeTab = index;
  }

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentsService: CommentsService,
    private navigate: Router,
    private currencyPipe: CurrencyPipe
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
  }

  onSubmit() {
    const comment: any = {
      content: this.commentForm.value.content || '',
    };

    this.commentsService.createComment(comment, this.product._id).subscribe(
      (response) => {
        console.log('Response', response);
        this.errorMessage = response.message;

        this.router.paramMap.subscribe((params) => {
          const id = params.get('id');
          this.productService.getProduct(id).subscribe((product) => {
            this.product = product.data;
            this.comments = product.data.comments;
          });
        });
      },
      (error) => {
        console.log('Error', error);
        this.errorMessage = error.error.message;
      }
    );
  }

  addToCart(product: any) {
    if (!this.user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
      return;
    }

    const cartData = sessionStorage.getItem('cart');
    this.cart = cartData
      ? JSON.parse(cartData)
      : {
          user: this.user?._id,
          products: [],
          totalPrice: 0,
        };

    const checkProduct = this.cart.products.findIndex(
      (prod: any) => prod.product._id === product._id
    );

    if (checkProduct !== -1) {
      this.cart.products[checkProduct].quantity += 1;
    } else {
      const newProduct = {
        product: product,
        quantity: 1,
      };

      this.cart.products.push(newProduct);
    }

    this.cart.totalPrice += product.price;

    sessionStorage.setItem('cart', JSON.stringify(this.cart));

    this.navigate.navigate(['cart']);
  }
}
