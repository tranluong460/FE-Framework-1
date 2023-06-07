import { OrderService } from 'src/app/services/order/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent {
  selectedValue: string = '';

  orders: any[] = [];
  order: any;

  p: number = 1;

  constructor(private oderService: OrderService) {
    this.oderService.gerAll().subscribe((res) => {
      this.orders = res.data;
    });
  }

  onSubmit() {
    console.log(this.selectedValue);
  }

  getOrder(id: any) {
    this.oderService.getById(id).subscribe((res) => {
      this.order = res.data;
    });
  }
}
