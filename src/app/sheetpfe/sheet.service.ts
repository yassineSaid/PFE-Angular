import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }

  sheet(): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/etudiant`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
