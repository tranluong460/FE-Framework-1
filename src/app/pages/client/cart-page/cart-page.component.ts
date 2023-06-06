import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  items: any;
  price: any;
  sumPrice: any;
  payPrice: any
  constructor(private cartService: CartService) {
    this.items = Array(2).fill(0);
    this.items = cartService.getCartItems()
    console.log(this.items);
    this.price = this.cartService.calculateTotalPrice()
    this.sumPrice = this.cartService.totalPrice(),
      this.pay()
  }
  addCart(item: any) {
    this.items = this.cartService.addToCart(item);
  }
  removeCart(id: any) {
    this.items = this.cartService.removeFromCart(id);
    // console.log(this.items);
  }
  onIncrea(id: any) {
    this.cartService.increaseQuantity(id);
    this.price = this.cartService.calculateTotalPrice()
    this.sumPrice = this.cartService.totalPrice();
    this.pay()
    // console.log(this.sumPrice);
  }
  onDecrea(id: any) {
    this.cartService.decreaseQuantity(id);
    this.price = this.cartService.calculateTotalPrice();
    this.sumPrice = this.cartService.totalPrice();
    this.pay()

  }
  pay() {
    this.payPrice = this.cartService.totalPrice() + 50000;
    console.log(this.payPrice);
  }
  // bill(prices: any, quantity: any) {
  //   this.price = prices * quantity
  // }
}
