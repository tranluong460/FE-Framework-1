import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/product');
  }

  getProduct(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/product/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/product`, product, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/product/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  updateProduct(product: any): Observable<any> {
    console.log(product);
    return this.http.patch<any>(
      `http://localhost:8080/product/${product._id}`,
      product,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}
