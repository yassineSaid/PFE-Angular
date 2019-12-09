import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  statEtrangerSheet(): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/dashboard`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
