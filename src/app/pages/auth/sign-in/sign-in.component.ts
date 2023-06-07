import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { ILoginUser } from 'src/app/interface/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  errorMessage: string = '';

  userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  routers() {
    this.router.navigate(['/auth/signUp']);
  }

  onHandleSubmit() {
    const user: ILoginUser = {
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
    };

    this.authService.login(user).subscribe(
      (response) => {
        console.log('Response', response);

        this.errorMessage = response.message;
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
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
