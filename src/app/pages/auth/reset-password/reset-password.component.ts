import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params) => {
      this.randomString = params.get('randomString');
    });
  }

  onHandleSubmit() {
    const resetPassword: any = {
      password: this.passwordForm.value.password || '',
      randomCode: this.passwordForm.value.randomCode || '',
      randomString: this.randomString || '',
      // confirmPassword: this.passwordForm.value.confirmPassword || '',
    };
    console.log(resetPassword);

    this.authService.resetPassword(resetPassword).subscribe(
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
