import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css'],
})
export class PayPageComponent {
  user: any;
  cart: any;
  orderForm: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    const info: any = localStorage.getItem('user');
    const cart: any = sessionStorage.getItem('cart');

    this.user = JSON.parse(info);
    this.cart = JSON.parse(cart);

    this.orderForm = this.fb.group({
      user: this.user._id,
      products: this.fb.array([]),
      totalPrice: this.cart.totalPrice,
    });

    // Lấy reference của FormArray 'products'
    const productsFormArray = this.orderForm.get('products') as FormArray;

    // Lặp qua từng sản phẩm trong giỏ hàng
    this.cart.products.forEach((prod: any) => {
      // Tạo FormGroup cho mỗi sản phẩm
      const productFormGroup = this.fb.group({
        product: prod.product._id,
        quantity: prod.quantity,
        price: prod.product.price,
      });

      // Thêm FormGroup vào FormArray 'products'
      productsFormArray.push(productFormGroup);
    });
  }

  onHandleSubmit() {
    // Xử lý khi submit form
    this.orderService.createOrder(this.orderForm.value).subscribe((data) => {
      sessionStorage.clear();
    });
  }
}
