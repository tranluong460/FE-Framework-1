import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css'],
})
export class PayPageComponent {
  user: any
  constructor(private orderService: OrderService) {
    const info: any = sessionStorage.getItem('cart');
    const inf = JSON.parse(info)
    this.user = inf.user
    console.log(this.user);
  }

}
