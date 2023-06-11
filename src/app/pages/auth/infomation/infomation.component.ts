import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.css'],
})
export class InfomationComponent {
  info: any;
  constructor(private userService: AuthService, private router: Router) {
    const idUser = JSON.parse(localStorage.getItem('user')!);
    // console.log(idUser._id);
    this.userService.getOneUser(idUser._id).subscribe((data) => {
      console.log(data);
      this.info = data.userWithoutPassword;
    });
  }
  next() {
    this.router.navigate(['/auth/information-update']);
  }
  prev() {
    this.router.navigate(['/']);
  }
}
