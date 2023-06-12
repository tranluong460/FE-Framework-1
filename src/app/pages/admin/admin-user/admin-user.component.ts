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

  // isLoading: any = true;

  onSubmit(id: string) {
    this.authService.lockAccount(id).subscribe((data) => {
      this.authService.getUser().subscribe((data) => {
        this.users = data.usersWithoutPassword;
      });
    });
  }

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((data) => {
      this.users = data.usersWithoutPassword;
    });

    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
  }

  lockAccount(id: string) {
    this.authService.getOneUser(id).subscribe((data) => {
      this.user = data.userWithoutPassword;
    });
  }
}
