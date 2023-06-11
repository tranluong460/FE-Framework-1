import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {}
