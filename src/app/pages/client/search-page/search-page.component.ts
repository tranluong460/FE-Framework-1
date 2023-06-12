import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../services/products/products.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  data: any;
  isLoading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService
  ) {
    this.router.paramMap.subscribe((params) => {
      const keyword = params.get('keyword');
      this.productsService.searchProduct(keyword).subscribe((product) => {
        this.data = product.data;
      });
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  formatCurrency(amount: number): string {
    const formattedAmount = amount.toLocaleString('en-US');
    return `${formattedAmount}₫`;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
