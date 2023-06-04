import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent {
  selectedValue: string = '';

  users: any[];

  p: number = 1;

  onSubmit() {
    console.log(this.selectedValue);
  }

  constructor() {
    this.users = Array(14).fill(0);
  }
}
