import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/category`);
  }

  getCategories(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/category/${id}`);
  }

  createCategories(category: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/category`, category, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  updateCategories(category: any): Observable<any> {
    return this.http.patch<any>(
      `http://localhost:8080/product/${category.id}`,
      category,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  removeCategories(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/category/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
