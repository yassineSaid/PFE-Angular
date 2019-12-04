import {Component, Inject, OnInit} from '@angular/core';
import {SoutenanceServiceService} from './soutenance-service.service';
import {Soutenance} from '../Models/soutenance';
import {User} from '../Models/user';
import {Notification} from '../Models/notification';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';


@Component({
  selector: 'app-soutenance-component',
  templateUrl: './soutenance-component.component.html',
  styleUrls: ['./soutenance-component.component.scss'],
  providers: [SoutenanceServiceService]
})
export class SoutenanceComponentComponent implements OnInit {

  user: User;
  soutenance: Soutenance[];
  note: Soutenance[];
  data: string;
  table: any[];
  submitted = false;
  ajout =  false;
  s: Soutenance = new Soutenance();
  notif: Notification = new Notification();


  constructor( private httpService: SoutenanceServiceService ,      @Inject(LOCAL_STORAGE) private storage: WebStorageService ) {

    this.user = this.storage.get('user');
    if (this.user.role === 'Admin' || this.user.role === 'Enseignant' || this.user.role === 'ChefDeDepartement' || this.user.role === 'DirecteurDesStages') {
      this.httpService.getsoutenanceNonNote().subscribe(data => {
        this.soutenance = data;
        console.log(this.soutenance);
      });
    }
    if (this.user.role === 'Etudiant') {
      this.httpService.getsoutenanceEtudiant().subscribe(
        data => {
          this.note = data;
          console.log(this.note);
        });
    }


  }
  afficherAjoutNote()
  {
    this.submitted = true;
  }

  ajouterNote(idS,notee,note)
  {
    this.s = {
      id: idS.value,
      notee: notee.value,
      note: note.value,
      description: null,
      titre: null,
      dateSoutenance: null,
      heureSoutenance: null,
      noteSoutenance: 0,
      salle: null
    };
    this.httpService.ajouterNote(idS,notee,note).subscribe(
      data =>
      {
        this.soutenance.push(this.s);
        console.log(this.soutenance);


      }
    );
    this.ajout = true;
    this.submitted = true;
    window.alert("la note a ete ajouter , s'il ya un conflit le directeur de stage vous le communiquera !");
    window.location.replace('/soutenanceNonNote');

  }


  ngOnInit() {

  }



}
