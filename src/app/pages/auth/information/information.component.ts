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

  formUser = this.fb.group({
    _id: [{ value: '' }, [Validators.required]],
    name: [{ value: '', disabled: true }, [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.required]],
    phone: [{ value: '', disabled: true }, [Validators.required]],
    address: [{ value: '', disabled: true }, [Validators.required]],
  });

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (!user) {
      this.router.navigate(['/auth/signIn']);
      return;
    }

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

  update() {
    this.isDisabled = false;
    this.formUser.get('name')?.enable();
    this.formUser.get('phone')?.enable();
    this.formUser.get('address')?.enable();
  }

  updateUser() {
    const updatedUser = {
      _id: this.formUser.getRawValue()._id || '',
      name: this.formUser.value.name || '',
      email: this.formUser.getRawValue().email || '',
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
