import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  createComment(comment: any, id: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of({ message: 'Bạn chưa đăng nhập' });
    }

    return this.http.post<any>(`http://localhost:8080/comment/${id}`, comment, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
