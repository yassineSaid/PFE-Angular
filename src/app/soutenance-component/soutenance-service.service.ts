import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Soutenance } from '../Models/soutenance';
import { Config } from '../Models/config';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Observable, observable} from 'rxjs';
import {Reclamation} from '../Models/Reclamation';
import {User} from "../Models/user";


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

  getAllReclamation()
  {
    return this.http.get<Reclamation[]>(`${Config.BASE_URL}reclamation/getAllReclamation`);
  }

   getsoutenanceNonNote() {
      return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/note`);
  }

  getAllSoutenance()
  {
    return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/soutenance`);
  }

  getsoutenanceEtudiant(id: number)
  {
    return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/getById/`+id);
  }

  getReclamationEtudiant(nom: string , prenom: string)
  {
   return this.http.get<Reclamation[]>(`${Config.BASE_URL}reclamation/getById/`+nom+`/`+prenom);
  }

  ajouterNote(idS , note , notee)
  {
    const body = {};
    return this.http.put<Soutenance[]>(`${Config.BASE_URL}soutenance/test/`+idS.value+`/`+note.value+`/`+notee.value , body );
  }

  ajouterReclamation(Reclamation)
  {
    const obj = {
      'textRec': Reclamation['textRec'],
      'etudiant' : { 'id': this.storage.get('user').id , 'nom': this.storage.get('user').nom , 'prenom': this.storage.get('user').prenom },
      'dateAjout': Date.now(),
      'soutenance' : { 'id': this.storage.get('user').id }
  }
    console.log(obj);
    return this.http.post<any>(`${Config.BASE_URL}reclamation/ajout` , obj , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  deleteReclamation ( id: number , idU: number)
  {
    return this.http.delete<Reclamation[]>(`${Config.BASE_URL}reclamation/delete/`+id+`/`+idU);
  }

  addNotification(ajoutNotification,idSoutenance : number)
  {
    const  obj = {
      'text': "vous n avez pas encore attribuer une note a la soutenance d id: "+idSoutenance+" , Veuiller svp régler cet etat",
      'user': { 'id': 26 },
      'etat': null
    }
    console.log(obj);
    return this.http.post<any>(`${Config.BASE_URL}notif/ajout` , obj , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

