import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Observable} from 'rxjs';
import {Config} from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  studentInternship(id): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}agreemen/etudiant/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
