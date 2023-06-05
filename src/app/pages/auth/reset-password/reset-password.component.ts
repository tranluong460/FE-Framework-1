import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResetPassword } from 'src/app/interface/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  errorMessage: string = '';

  password: any;

  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    randomCode: [''],
    // confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  randomString!: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: ActivatedRoute,
    private routerPage: Router
  ) {
    this.router.paramMap.subscribe((params) => {
      this.randomString = params.get('randomString');
    });
  }

  onHandleSubmit() {
    const resetPassword: IResetPassword = {
      password: this.passwordForm.value.password || '',
      randomCode: this.passwordForm.value.randomCode || '',
      randomString: this.randomString || '',
    };

    this.authService.resetPassword(resetPassword).subscribe(
      (response) => {
        if (Array.isArray(response.message)) {
          this.errorMessage = response.message[0];
        } else {
          if (response.message === 'Đổi mật khẩu thành công') {
            this.routerPage.navigate(['auth/signIn']);
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
