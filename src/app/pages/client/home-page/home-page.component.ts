import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  items: any;
  isLoading: boolean = true;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
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

  private counter = 1;
  private timerIdRef: any;

  ngOnInit(): void {
    this.timerIdRef = setInterval(() => {
      const radioCheck = this.elementRef.nativeElement.querySelector(
        `#radio${this.counter}`
      ) as HTMLInputElement;
      if (radioCheck) {
        radioCheck.checked = true;
        this.counter++;
        if (this.counter > 5) {
          this.counter = 1;
        }
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerIdRef);
  }

  formatCurrency(amount: number): string {
    const formattedAmount = amount.toLocaleString('en-US');
    return `${formattedAmount}₫`;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
