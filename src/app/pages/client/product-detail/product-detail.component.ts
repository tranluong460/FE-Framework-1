import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '../../../services/comments/comments.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
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
    private commentsService: CommentsService // private _snackBar: MatSnackBar
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

    this.commentsService.createComment(comment, this.product._id).subscribe(
      (response) => {
        this.errorMessage = 'Bình luận thành công!';
      },
      (error) => {
        if (Array.isArray(error.error.message)) {
          this.errorMessage = error.error.message[0];
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

  // }

  // openSnackBar() {
  //   this._snackBar.open(this.errorMessage, 'Đóng', {
  //     duration: 3000,
  //     verticalPosition: 'top',
  //   });
  // }
}
