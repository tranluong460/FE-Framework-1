import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent {
  selectedValue: string = '';

  orders: any[];

  onSubmit() {
    console.log(this.selectedValue);
  }

  constructor() {
    this.orders = Array(14).fill(0);
  }
}
