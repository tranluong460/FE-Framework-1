import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.css'],
})
export class InfomationComponent {
  info: any;

  isDisabled: any = 0;
  formUser = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required]],
    isLockAccount: false,
    role: 'User',
    isVerify: [''],
  });
  constructor(
    private userService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const idUser = JSON.parse(localStorage.getItem('user')!);
    // console.log(idUser._id);
    this.userService.getOneUser(idUser._id).subscribe((data) => {
      console.log(data);
      this.info = data.userWithoutPassword;
      this.formUser.patchValue({
        name: this.info.name,
        password: this.info.password,
        phone: this.info.phone,
        email: this.info.email,
        address: this.info.address,
        isLockAccount: this.info.isLockAccount,
        role: this.info.role,
        isVerify: this.info.isVerify._id,
      });
    });
  }
  next() {
    this.isDisabled = 1;
  }
  prev() {
    this.router.navigate(['/']);
  }
  updateUser() {
    const updatedUser = {
      name: this.formUser.value.name || '',
      phone: this.formUser.value.phone || '',
      address: this.formUser.value.address || '',
      // email: this.info.email,
      _id: this.info._id,
      password: this.info.password,
      isLockAccount: this.info.isLockAccount,
      role: this.info.role,
      isVerify: this.info.isVerify._id,
    };
    console.log(updatedUser);

    this.userService.updateUser(updatedUser).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.data));
        this.isDisabled = 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
