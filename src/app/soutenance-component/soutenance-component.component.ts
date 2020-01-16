import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {SoutenanceServiceService} from './soutenance-service.service';
import {Soutenance} from '../Models/soutenance';
import {User} from '../Models/user';
import {Notification} from '../Models/notification';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-soutenance-component',
  templateUrl: './soutenance-component.component.html',
  styleUrls: ['./soutenance-component.component.scss'],
  providers: [SoutenanceServiceService]
})
export class SoutenanceComponentComponent implements OnInit {

  user: User;
  soutenance: Soutenance[];
  allsoutenance: Soutenance[];
  note: Soutenance[];
  data: string;
  table: any[];
  submitted = false;
  ajout =  false;
  click = false;
  afiche = false;
  s: Soutenance = new Soutenance();
  notif: Notification = new Notification();
  ajoutNotification: FormGroup;
  @Output() hide = new EventEmitter<any>();


  constructor( private httpService: SoutenanceServiceService ,      @Inject(LOCAL_STORAGE) private storage: WebStorageService , private formBuilder: FormBuilder ) {

    this.user = this.storage.get('user');
    if (this.user.role === 'Admin' || this.user.role === 'Enseignant' || this.user.role === 'ChefDeDepartement' || this.user.role === 'DirecteurDesStages') {
      this.httpService.getsoutenanceNonNote().subscribe(data => {
        this.soutenance = data;
        console.log(this.soutenance);
      });

      this.httpService.getAllSoutenance().subscribe(data => {
        this.allsoutenance = data;
        console.log(this.allsoutenance);
      });
    }
    if (this.user.role === 'Etudiant') {
      this.httpService.getsoutenanceEtudiant(this.user.id).subscribe(
        data => {
          this.note = data;
          console.log(this.note);
        });
    }


  }


  consulterRec()
  {
    this.afiche = true;
  }


  afficherAjoutNote()
  {
    this.submitted = true;
  }
  notify()
  {
    this.click = true;
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
    if ( (notee.value - note.value) > 0) {
      window.alert("il y a un conflit dans la note que vous avez ajouté , la direction traitera ce probleme et vous communiquera par mail");
      window.location.replace('/soutenanceNonNote');

    } else{
      window.alert("la note a ete ajouté avec succés");
      window.location.replace('/soutenanceNonNote');
    }

  }



  ngOnInit() {
    this.ajoutNotification = this.formBuilder.group(
      {
        etat: [''],
        text: [''],
        idEnseignant: ['']
      }
    );
  }
  getEtat()
  {
    this.ajoutNotification.get('etat');
  }
  getText()
  {
    this.ajoutNotification.get('text');
  }
  getIdEnseignant()
  {
    this.ajoutNotification.get('idEnseignant');
  }


  ajoutNotif(idSoutenance){
    this.httpService.addNotification(this.ajoutNotification.value,idSoutenance).subscribe(    success => {
      if (success) {
        this.hide.emit();
        window.alert("aaaa");

      }
    });
  }




}
