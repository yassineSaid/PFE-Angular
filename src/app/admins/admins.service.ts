import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../Models/admin';
import { Config } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Admin[]> {
    return this.http.get<any>(`${Config.BASE_URL}admin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom:string,prenom:string,email:string,password:string): Observable<any> {
    let obj = {
      "nom" : nom,
      "prenom" : prenom,
      "email" : email,
      "password" : password,
    }
    return this.http.post<any>(`${Config.BASE_URL}admin`,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
