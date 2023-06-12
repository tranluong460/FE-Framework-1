import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interface/product';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css'],
})
export class PayPageComponent {
  user: any;
  cart: any;
  p: number = 1;
  paymentMethod: string = 'Thanh toán khi nhận hàng';
  errorMessage: string = '';

  tax: number = 0;
  shipping: number = 50000;
  totalCalc: number = 0;

  discount: any = [];

  activeTab: number = 0;

  // Định nghĩa các FormGroup
  orderForm = this.fb.group({
    user: [''],
    products: [[] as IProduct[]],
    totalPrice: [0],
    paymentMethod: [''],
  });

  discountForm = this.fb.group({
    code: [''],
  });

  paymentForm = this.fb.group({
    orderId: [''],
    cardHolderName: [''],
    cardNumber: [''],
    day: [''],
    month: [''],
    expirationDate: [''],
    cvv: [''],
  });

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    // Khởi tạo user và cart
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const cart: any = JSON.parse(sessionStorage.getItem('cart') || '{}');
    this.user = user;
    this.cart = cart.products ? cart : { products: [], totalPrice: 0 };

    if (JSON.stringify(user) === '{}') {
      this.router.navigate(['/auth/signIn']);
      return;
    }

    // Tính tổng
    this.calculateTotal();
  }

  // Áp dụng mã giảm giá
  applyDiscount() {
    const discountCode: string = this.discountForm.value.code || '';

    // Kiểm tra xem mã giảm giá cùng loại đã được áp dụng chưa
    const isDiscountApplied = this.discount.some(
      (discountItem: any) => discountItem.code === discountCode
    );

    if (!isDiscountApplied) {
      const discount: any = {
        code: discountCode,
      };

      this.paymentService.getDiscount(discount).subscribe(
        (discountRes) => {
          console.log('Discount Res', discountRes);
          this.discount.push(discountRes.data);
          this.calculateTotal();
        },
        (discountErr) => {
          console.log('Discount Error', discountErr);
          this.errorMessage = discountErr.error.message;
        }
      );
    }
  }

  // Tính tổng giá
  calculateTotal() {
    if (this.discount.length > 0) {
      let totalDiscount = 0;

      this.discount.forEach((discountItem: any) => {
        if (discountItem.type === 'FreeShip') {
          this.shipping = 0;
        } else if (discountItem.type === 'FixedAmount') {
          totalDiscount += discountItem.value;
        } else if (discountItem.type === 'Percentage') {
          totalDiscount += (discountItem.value / 100) * this.cart?.totalPrice;
        }
      });

      this.totalCalc =
        this.cart?.totalPrice + this.tax + this.shipping - totalDiscount;
    } else {
      this.totalCalc = this.cart?.totalPrice + this.tax + this.shipping;
    }
  }

  // Đặt phương thức thanh toán và activeTab
  setPaymentMethod(paymentMethod: any, activeTab: any) {
    this.paymentMethod = paymentMethod;
    this.activeTab = activeTab;
  }

  // Xử lý khi form được submit
  onHandleSubmit() {
    const order: any = {
      user: this.user._id,
      products: this.cart.products.map((prod: any) => ({
        product: prod.product._id,
        quantity: prod.quantity,
        price: prod.product.price,
      })),
      totalPrice: this.totalCalc,
      paymentMethod: this.paymentMethod,
    };

    this.orderService.createOrder(order).subscribe(
      (orderRes) => {
        let orderID = orderRes.orderId;

        if (this.paymentMethod === 'Thanh toán bằng thẻ') {
          const payment: any = {
            orderId: orderID || '',
            cardHolderName: this.paymentForm.value.cardHolderName || '',
            cardNumber: this.paymentForm.value.cardNumber || '',
            expirationDate:
              `${this.paymentForm.value.day}/${this.paymentForm.value.month}` ||
              '',
            cvv: this.paymentForm.value.cvv || '',
          };

          this.paymentService.paymentCard(payment).subscribe(
            (paymentRes) => {
              console.log('Payment Response', paymentRes);
            },
            (paymentErr) => {
              console.log('Payment Error', paymentErr);

              this.errorMessage = paymentErr.error.message[0];
            }
          );
        }

        sessionStorage.removeItem('cart');
        window.location.reload();
      },
      (orderErr) => {
        console.log('Order Error', orderErr);

        this.errorMessage = orderErr.error.message;
      }
    );
  }
}
