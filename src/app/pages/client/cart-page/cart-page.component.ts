import { CartService } from './../../../services/cart/cart.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  items: any;

  cart: any = {
    user: '',
    products: [],
    totalPrice: 0,
  };

  p: number = 1;

  constructor(private cartService: CartService) {
    const cart: any = sessionStorage.getItem('cart');
    this.items = cart ? JSON.parse(cart) : { products: [], totalPrice: 0 };
  }

  changeQuantity(item: any, action: string) {
    item.quantity = this.cartService.changeQuantity(item, action);
    if (item.quantity > 0) {
      this.updateQuantity(item);
    }
  }

  updateQuantity(item: any) {
    const cartData: any = sessionStorage.getItem('cart');
    this.cart = JSON.parse(cartData);
    this.cart = this.cartService.updateQuantity(this.cart, item, item.quantity);
    this.items.totalPrice = this.cart.totalPrice;
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  delItemCart(id: string) {
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
