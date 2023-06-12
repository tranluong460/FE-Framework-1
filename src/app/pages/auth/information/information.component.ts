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
export class InformationComponent {
  info: any;
  isDisabled: boolean = true;
  activeTab: number = 0;

  currentStep: number = 0;
  activeRestPass: number = 0;
  message: string = '';
  restPassMessage: string = '';

  order: any;
  proId: any;

  formUser = this.fb.group({
    _id: [{ value: '' }, [Validators.required]],
    name: [{ value: '' }, [Validators.required]],
    email: [{ value: '' }, [Validators.required]],
    phone: [{ value: '' }, [Validators.required]],
    address: [{ value: '' }, [Validators.required]],
  });

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService
  ) {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : {};

    if (JSON.stringify(user) === '{}') {
      this.router.navigate(['/auth/signIn']);
      return;
    }

    this.info = user;

    this.userService.getOneUser(user._id).subscribe((data) => {
      this.formUser.patchValue({
        _id: data.userWithoutPassword._id,
        name: data.userWithoutPassword.name,
        email: data.userWithoutPassword.email,
        phone: data.userWithoutPassword.phone,
        address: data.userWithoutPassword.address,
      });
    });

    this.orderService.getOrderByIdUser(user._id).subscribe((item: any) => {
      this.order = item.orders;
    });
  }

  getProductById(id: string) {
    this.orderService.getById(id).subscribe((data) => {
      console.log(data.data.products);
      this.proId = data.data;
    });
  }

  changeTab(index: number) {
    this.activeTab = index;
  }

  updateUser() {
    const updatedUser = {
      _id: this.formUser.value._id || '',
      name: this.formUser.value.name || '',
      email: this.formUser.value.email || '',
      phone: this.formUser.value.phone || '',
      address: this.formUser.value.address || '',
    };

    this.userService.updateUser(updatedUser).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendCode() {
    const FormEmail = {
      email: this.info.email,
    };

    this.userService.sendCode(FormEmail).subscribe(
      (res) => {
        this.message = res.message + ', vào mail để lấy mã bảo mật';
        sessionStorage.setItem('activeCode', res.code);
        setTimeout(() => {
          this.activeRestPass = 1;
        }, 3000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkCode() {
    const FormCode = {
      code: this.firstFormGroup.value.firstCtrl,
    };

    this.userService.checkCode(FormCode).subscribe(
      (res) => {
        this.activeRestPass = 2;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  next() {
    this.activeRestPass = 3;
  }

  restPassword() {
    const FormRestPassword = {
      oldPassword: this.secondFormGroup.value.oldPassword,
      password: this.secondFormGroup.value.password,
      confirmPassword: this.secondFormGroup.value.confirmPassword,
    };

    console.log(FormRestPassword);

    this.userService.changePass(FormRestPassword).subscribe(
      (res) => {
        console.log(res.message);
        this.restPassMessage = res.message;
        setTimeout(() => {
          this.currentStep = 2;
        }, 1000);

        setTimeout(() => {
          sessionStorage.removeItem('activeCode');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth/signIn';
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.restPassMessage = error.error.message;
      }
    );
  }
}
