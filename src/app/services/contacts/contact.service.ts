import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/contact`);
  }

  getOne(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/contact/${id}`);
  }

  createContact(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/contact`, data);
  }
}
