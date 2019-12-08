import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecole } from '../Models/ecole';
import { Config } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class EcoleService {

  constructor(private http: HttpClient) { }
  getEcole(): Observable<Ecole> {
    return this.http.get<any>(`${Config.BASE_URL}admin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom:string,adresse:string): Observable<any> {
    let obj = {
      "nom" : nom,
      "adresse" : adresse,
    }
    return this.http.post<any>(`${Config.BASE_URL}ecole`,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  modifier(nom:string,adresse:string,id:number): Observable<any> {
    let obj = {
      "nom" : nom,
      "adresse" : adresse,
    }
    return this.http.put<any>(`${Config.BASE_URL}ecole/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
