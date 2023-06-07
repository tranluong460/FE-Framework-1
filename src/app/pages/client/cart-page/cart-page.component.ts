import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe],
})
export class CartPageComponent {
  items: any;

  cart: any = {
    user: '',
    products: [],
    totalPrice: 0,
  };

  p: number = 1;

  constructor(private currencyPipe: CurrencyPipe) {
    const cart: any = sessionStorage.getItem('cart');
    this.items = JSON.parse(cart);
  }

  changeQuantity(item: any, action: string) {
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease') {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }

    if (item.quantity > 0) {
      this.updateQuantity(item);
    }
  }

  updateQuantity(item: any) {
    const cartData: any = sessionStorage.getItem('cart');
    this.cart = JSON.parse(cartData);

    const checkProduct = this.cart.products.findIndex(
      (prod: any) => prod.product._id === item.product._id
    );

    if (checkProduct !== -1) {
      const newQuantity = item.quantity;
      const oldQuantity = this.cart.products[checkProduct].quantity;
      const quantityDiff = newQuantity - oldQuantity;

      this.cart.products[checkProduct].quantity = newQuantity;
      this.cart.totalPrice +=
        this.cart.products[checkProduct].product.price * quantityDiff;
    }

    this.items.totalPrice = this.cart.totalPrice;

    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  delItemCart(id: any) {
    const cartData: any = sessionStorage.getItem('cart');
    this.cart = JSON.parse(cartData);

    const index = this.cart.products.findIndex(
      (prod: any) => prod.product._id === id
    );

    if (index !== -1) {
      const deletedProduct = this.cart.products[index];
      this.cart.products.splice(index, 1);
      this.cart.totalPrice -=
        deletedProduct.quantity * deletedProduct.product.price;
      this.items = { ...this.cart };
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
