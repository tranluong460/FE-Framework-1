import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailForm = this.fb.group({
    email: ['']
  })
  constructor(private authService: AuthService,
    private fb: FormBuilder) { }
  onSubmit() {
    const email = {
      email: this.emailForm.value.email || ''
    }
    this.authService.resetPasswordEmail(email).subscribe(data => {
      window.localStorage.setItem('accessCode', data.accessCode)
    })
  }
}
