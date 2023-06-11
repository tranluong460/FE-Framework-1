import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: any;
  constructor(private http: HttpClient) {}
  gerAll(): Observable<any> {
    return this.http.get<any>(' http://localhost:8080/order');
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(` http://localhost:8080/order/${id}`);
  }
  getOrderByIdUser(id: any): Observable<any> {
    return this.http.get<any>(` http://localhost:8080/order/user/${id}`);
  }
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(` http://localhost:8080/order`, order);
  }
  updateOrder(id: any, orderStatus: any): Observable<any> {
    return this.http.put<any>(
      ` http://localhost:8080/order/${id}`,
      orderStatus,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}
