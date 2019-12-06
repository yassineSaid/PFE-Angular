import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../Models/config';
import {PfeNotification} from '../Models/pfe-notification';
import {error} from 'util';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  sheet(id): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sheets(etat, year, pays, categorie): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/` + etat + '/' + year + '/' + pays + '/' + categorie, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  enseignantSheets(year, toyear, type): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/enseignant/`  + year + '/' + toyear + '/'
      + type + '/' + this.storage.get('user').id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  studentSheet(id): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/etudiant/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  notifySheet(id): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/notificationetudiant/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  categories(): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}Categorie`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  entreprises(): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}Entreprises`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  enseignantsheet(type, id): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/` + type + `/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  affectenseignantsheet(type, sheet_id, enseignant_id): Observable<any> {
    return this.http.post<any>(`${Config.BASE_URL}sheet/` + type + `/affect/` + sheet_id + `/` + enseignant_id + `/`
      + this.storage.get('user').id , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateenseignantsheet(type, sheet_id, enseignant_id): Observable<any> {
    return this.http.put<any>(`${Config.BASE_URL}sheet/` + type + `/` + sheet_id + `/` + enseignant_id + `/`
      + this.storage.get('user').id , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  validsheetByDirecteur(sheet_id, etat): Observable<any> {
    return this.http.put<any>(`${Config.BASE_URL}sheet/verification/` + sheet_id + `/` + etat + `/` + this.storage.get('user').id , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  validsheetByEnseignant(sheet_id, etat, note): Observable<any> {
    return this.http.post<any>(`${Config.BASE_URL}sheet/valid/` + sheet_id + `/` + etat + `/` + note + `/` + this.storage.get('user').id , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addSheet(sheet): Observable<boolean> {
    sheet.etudiant = this.storage.get('user')
    return this.http.post<any>(`${Config.BASE_URL}sheet`, JSON.stringify(sheet), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateSheet(sheet): Observable<boolean> {
    sheet.etudiant = this.storage.get('user')
    return this.http.put<any>(`${Config.BASE_URL}sheet`, JSON.stringify(sheet), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  noteSheet(type, note, sheet_id): Observable<boolean> {
    return this.http.post<any>(`${Config.BASE_URL}sheet/` + type + '/' + note + '/' + sheet_id,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
