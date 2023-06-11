import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {
  info: any;
  isDisabled: boolean = true;
  activeTab: any = 0;

  formUser = this.fb.group({
    _id: [{ value: '' }, [Validators.required]],
    name: [{ value: '' }, [Validators.required]],
    email: [{ value: '' }, [Validators.required]],
    phone: [{ value: '' }, [Validators.required]],
    address: [{ value: '' }, [Validators.required]],
  });

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private router: Router
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
}
