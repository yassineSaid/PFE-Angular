import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Soutenance } from '../Models/soutenance';
import { Config } from '../Models/config';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Observable, observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SoutenanceServiceService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient , @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }


   getsoutenanceNonNote() {
      return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/note`);
  }

  getsoutenanceEtudiant()
  {
    return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/getByTitre/pfe`);
  }

  ajouterNote(idS , note , notee)
  {
    const body = {};
    return this.http.put<Soutenance[]>(`${Config.BASE_URL}soutenance/test/`+idS.value+`/`+note.value+`/`+notee.value , body );
  }


}

