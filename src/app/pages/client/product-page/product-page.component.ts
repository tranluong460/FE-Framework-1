import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  items: IProduct[] = [];
  isLoading: boolean = true;

  formatCurrency(amount: number): string {
    const formattedAmount = amount.toLocaleString('en-US');
    return `${formattedAmount}₫`;
  }

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.productsService.getAllProducts().subscribe((data) => {
      this.items = data.data;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
