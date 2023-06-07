import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IRegisterUser } from 'src/app/interface/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  errorMessage: string = '';

  userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  routerSignIn() {
    this.router.navigate(['/auth/signIn']);
  }

  onHandleSubmit() {
    const user: IRegisterUser = {
      name: this.userForm.value.name || '',
      email: this.userForm.value.email || '',
      phone: this.userForm.value.phone || '',
      address: this.userForm.value.address || '',
      password: this.userForm.value.password || '',
      confirmPassword: this.userForm.value.confirmPassword || '',
    };

    this.authService.register(user).subscribe(
      (response) => {
        console.log('Response', response);

        this.errorMessage = response.message;
      },
      (error) => {
        console.log('Error', error);

        if (Array.isArray(error.error.message)) {
          this.errorMessage = error.error.message[0];
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}
