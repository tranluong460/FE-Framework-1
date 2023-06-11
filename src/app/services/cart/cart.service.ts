import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  info: any = localStorage.getItem('user');
  user = this.info ? JSON.parse(this.info) : {};
  items: any;
  cart: any = {
    user: '',
    products: [],
    totalPrice: 0,
  };

  constructor(private navigate: Router) {}

  addToCart(product: any): void {
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

  changeQuantity(item: any, action: string) {
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease') {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }

    return item.quantity;
  }

  updateQuantity(cart: any, item: any, newQuantity: number) {
    const checkProduct = cart.products.findIndex(
      (prod: any) => prod.product._id === item.product._id
    );

    if (checkProduct !== -1) {
      const oldQuantity = cart.products[checkProduct].quantity;
      const quantityDiff = newQuantity - oldQuantity;

      cart.products[checkProduct].quantity = newQuantity;
      cart.totalPrice +=
        cart.products[checkProduct].product.price * quantityDiff;
    }

    return cart;
  }
}
