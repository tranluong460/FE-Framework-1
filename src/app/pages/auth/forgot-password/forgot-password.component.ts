import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IForgotPassword } from 'src/app/interface/auth';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  errorMessage: string = '';

  emailForm = this.fb.group({
    email: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  onSubmit() {
    const email: IForgotPassword = {
      email: this.emailForm.value.email || '',
    };

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        console.log('Response', response);

        this.errorMessage = response.message;
        window.localStorage.setItem('accessCode', response.accessCode);
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
