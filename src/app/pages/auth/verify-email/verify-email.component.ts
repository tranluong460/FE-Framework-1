import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  errorMessage: string = '';
  verifyCode: string = '';

  verifyForm = this.formBuilder.group({
    randomCode: [''],
    verifyCode: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {
    this.router.paramMap.subscribe((params) => {
      const verifyCode = params.get('verifyCode');
      this.verifyCode = verifyCode !== null ? verifyCode : '';
    });
  }

  onHandleSubmit() {
    const verifyForm: any = {
      randomCode: this.verifyForm.value.randomCode || '',
      verifyCode: this.verifyCode || '',
    };

    this.authService.verifyEmail(verifyForm).subscribe(
      (response) => {
        console.log('Response', response);

        this.errorMessage = response.message;
        // this.routerPage.navigate(['/auth/signIn']);
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
