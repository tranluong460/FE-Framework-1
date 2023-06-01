import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
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
    const email = {
      email: this.emailForm.value.email || '',
    };

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        console.log('Gửi thành công', response);
        window.localStorage.setItem('accessCode', response.accessCode);
      },
      (error) => {
        if (Array.isArray(error.error.message)) {
          console.log(error.error.message);
          this.errorMessage = error.error.message[0];
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}