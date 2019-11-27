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
    return this.http.post<any>(`${Config.BASE_URL}authentication`, {email,password}.toString(), {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
  }
}
