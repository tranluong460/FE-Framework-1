import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information-update',
  templateUrl: './information-update.component.html',
  styleUrls: ['./information-update.component.css'],
})
export class InformationUpdateComponent {
  info: any;
  formUser = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required]],
    isLockAccount: false,
    role: 'User',
    isVerify: [''],
  });

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const idUser = JSON.parse(localStorage.getItem('user')!);
    this.userService.getOneUser(idUser._id).subscribe((data) => {
      console.log(data);
      this.info = data.userWithoutPassword;
      this.formUser.patchValue({
        name: this.info.name,
        phone: this.info.phone,
        // email: this.info.email,
        address: this.info.address,
        // isLockAccount: this.info.isLockAccount,
        // role: this.info.role,
        // isVerify: this.info.isVerify._id,
      });
    });
  }

  updateUser() {
    const updatedUser = {
      name: this.formUser.value.name || '',
      phone: this.formUser.value.phone || '',
      address: this.formUser.value.address || '',
      // email: this.info.email,
      _id: this.info._id,
    };
    console.log(updatedUser);

    this.userService.updateUser(updatedUser).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
