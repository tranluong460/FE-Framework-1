import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
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

  constructor(private authService: AuthService, private fb: FormBuilder) {}
  onSubmit() {
    const email: IForgotPassword = {
      email: this.emailForm.value.email || '',
    };

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        if (Array.isArray(response.message)) {
          this.errorMessage = response.message[0];
        } else {
          if (response.message === 'Gửi mã thành công') {
            this.errorMessage = response.message;
            window.localStorage.setItem('accessCode', response.accessCode);
          } else {
            this.errorMessage = response.message;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
