import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    let obj = {
      "email": email,
      "password": password
    }
    return this.http.post<any>(`${Config.BASE_URL}authentication`, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),withCredentials : true
    });
  }
  listAdmin(): Observable<Object> {
    return this.http.get<any>(`${Config.BASE_URL}admin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),withCredentials: true
    });
  }
}
