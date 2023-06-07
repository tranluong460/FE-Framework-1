import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  items: any;

  p: number = 1;

  constructor() {
    const cart: any = sessionStorage.getItem('cart');
    this.items = JSON.parse(cart);
  }
}
