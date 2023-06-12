import { OrderService } from 'src/app/services/order/order.service';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent {
  orderForm = this.formBuilder.group({
    status: ['', [Validators.required]],
  });

  orders: any[] = [];
  order: any;

  p: number = 1;

  constructor(
    private oderService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.oderService.gerAll().subscribe((res) => {
      this.orders = res.data;
    });
  }

  onSubmit(id: string) {
    const orderStatus: any = {
      status: this.orderForm.value.status || '',
    };

    this.oderService.updateOrder(id, orderStatus).subscribe(() => {
      this.oderService.gerAll().subscribe((res) => {
        this.orders = res.data;
      });
    });
  }

  getOrder(id: string) {
    this.oderService.getById(id).subscribe((res) => {
      this.order = res.data;
    });
  }
}
