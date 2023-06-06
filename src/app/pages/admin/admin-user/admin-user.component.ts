import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent {
  selectedValue: string = '';

  users: any[] = [];

  user: any;

  p: number = 1;

  onSubmit(id: any) {
    this.authService.lockAccount(id).subscribe((data) => {});
  }

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((data) => {
      this.users = data.usersWithoutPassword;
    });
  }

  lockAccount(id: any) {
    this.authService.getOneUser(id).subscribe((data) => {
      this.user = data.userWithoutPassword;
    });
  }
}
