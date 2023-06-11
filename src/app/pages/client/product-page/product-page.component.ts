import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  items: any;
  isLoading: any = true;

  formatCurrency(amount: number): string {
    const formattedAmount = amount.toLocaleString('en-US');
    return `${formattedAmount}₫`;
  }

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.items = Array(6).fill(0);
    this.productsService.getAllProducts().subscribe((data) => {
      this.items = data.data;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
