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

  getUser(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8080/user');
  }

  getOneUser(id: any): Observable<any> {
    return this.http.get<any[]>(`http://localhost:8080/user/${id}`);
  }

  lockAccount(id: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/lockAccount/${id}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  login(data: ILoginUser): Observable<any> {
    return this.http.post<ILoginUser>('http://localhost:8080/login', data);
  }

  register(data: IRegisterUser): Observable<any> {
    return this.http.post<IRegisterUser>(
      'http://localhost:8080/register',
      data
    );
  }

  forgotPassword(data: IForgotPassword): Observable<any> {
    return this.http.post<IForgotPassword>(
      'http://localhost:8080/forgot-password',
      data
    );
  }

  resetPassword(data: IResetPassword): Observable<any> {
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
