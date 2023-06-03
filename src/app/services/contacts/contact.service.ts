import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  createContact(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/contact`, data);
  }
}
