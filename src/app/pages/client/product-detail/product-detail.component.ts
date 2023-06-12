import { CartService } from './../../../services/cart/cart.service';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '../../../services/comments/comments.service';

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
  errorMessage: string = '';

  isLoading: boolean = true;

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
    private cartService: CartService
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
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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
    this.cartService.addToCart(product);
  }
}
