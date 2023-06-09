import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css'],
})
export class PayPageComponent {
  user: any;
  cart: any;
  p: number = 1;
  paymentMethod: any = 'Thanh toán bằng thẻ';
  errorMessage: any;

  tax: any = 100000;
  shipping: any = 50000;
  totalCalc: any = 0;

  activeTab: number = 0;

  orderForm = this.fb.group({
    user: [''],
    products: [[] as any[]],
    totalPrice: [0],
    paymentMethod: [''],
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
    private paymentService: PaymentService
  ) {
    const info: any = localStorage.getItem('user');
    const cart: any = sessionStorage.getItem('cart');
    this.user = JSON.parse(info);

    this.cart = cart ? JSON.parse(cart) : { products: [], totalPrice: 0 };

    this.calculateTotal();
  }

  calculateTotal() {
    this.totalCalc = this.cart?.totalPrice + this.tax + this.shipping;
  }

  setPaymentMethod(paymentMethod: any, activeTab: any) {
    this.paymentMethod = paymentMethod;
    this.activeTab = activeTab;
  }

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
