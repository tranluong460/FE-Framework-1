import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IForgotPassword,
  ILoginUser,
  IRegisterUser,
  IResetPassword,
} from 'src/app/interface/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // getUser(): Observable<any> {
  //   return this.http.get('http://localhost:8080/user');
  // }

  login(data: ILoginUser): Observable<ILoginUser> {
    return this.http.post<ILoginUser>('http://localhost:8080/login', data);
  }

  register(data: IRegisterUser): Observable<IRegisterUser> {
    return this.http.post<IRegisterUser>(
      'http://localhost:8080/register',
      data
    );
  }

  forgotPassword(data: IForgotPassword): Observable<IForgotPassword> {
    return this.http.post<IForgotPassword>(
      'http://localhost:8080/forgot-password',
      data
    );
  }

  resetPassword(data: IResetPassword): Observable<IResetPassword> {
    return this.http.post<IResetPassword>(
      'http://localhost:8080/reset-password',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessCode'),
        },
      }
    );
  }
}
