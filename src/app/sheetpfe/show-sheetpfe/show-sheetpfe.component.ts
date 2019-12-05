import {Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import {AffectSheetpfeEnseignantComponent} from '../affect-sheetpfe-enseignant/affect-sheetpfe-enseignant.component';
import {ModalManager} from 'ngb-modal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ValidSheetpfeComponent} from '../valid-sheetpfe/valid-sheetpfe.component';
import {SheetService} from '../sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {SheetPFE} from '../../Models/sheet-pfe';
import {PfeNotification} from '../../Models/pfe-notification';
import {ActivatedRoute} from '@angular/router';
import {error} from 'util';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {Enseignantsheet} from '../../Models/enseignantsheet';
import {NoteSheetpfeComponent} from '../note-sheetpfe/note-sheetpfe.component';

@Component({
  selector: 'app-show-sheetpfe',
  templateUrl: './show-sheetpfe.component.html',
  styleUrls: ['./show-sheetpfe.component.scss']
})
export class ShowSheetpfeComponent implements OnInit {

  edit: Boolean = false;
  details: Boolean = false;
  user: User;
  sheet: SheetPFE;
  notify: PfeNotification[];
  sheet_id: any;
  notFound: any;
  exist_e: Boolean = false;
  exist_r: Boolean = false;
  exist_v: Boolean = false;
  enseignantsheet: Enseignantsheet;
  constructor(private modal: NgbModal, private sheetService: SheetService, private route: ActivatedRoute,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.sheet_id = +params['id']; });
    this.user = this.storage.get('user');
    if (this.user.role === 'Etudiant') {
      if (this.sheet_id) {
        this.notFound = 'assets/images/404/404.png';
      } else {
        this.sheetService.studentSheet(this.user.id).subscribe(data => {
          if (data) {
            this.sheet = data;
            this.sheet.enseignantsheet.forEach(es => {
              if (es.type === 'ENCADREUR') {
                this.exist_e = true;
              } if (es.type === 'RAPPORTEUR') {
                this.exist_r = true;
              }  if (es.type === 'VALIDATEUR') {
                this.exist_v = true;
              }
            });
          }
        });
      }
      this.sheetService.notifySheet(this.user.id).subscribe(data => {
        if (data) {
          this.notify = Array.from(data.filter(n => n.vu === 0).values());
        }
      });
    }
    if (this.user.role === 'ChefDeDepartement') {
        this.sheetService.sheet(this.sheet_id).subscribe(data => {
          if (data.etat !== 'DEFAULT' || data.etat !== 'REFUSE' ) {
            this.sheet = data;
            this.sheet.enseignantsheet.forEach(es => {
              if (es.type === 'ENCADREUR') {
                this.exist_e = true;
              } if (es.type === 'RAPPORTEUR') {
                this.exist_r = true;
              }  if (es.type === 'VALIDATEUR') {
                this.exist_v = true;
              }
            });
          } else {
              this.notFound = 'assets/images/404/404.png';
          }
        }, error =>  {
          if (error.status === 404) {
            this.notFound = 'assets/images/404/404.png';
          }
        } );
    }

    if (this.user.role === 'DirecteurDesStages') {
      this.sheetService.sheet(this.sheet_id).subscribe(data => {
        if (data) {
          this.sheet = data;
          this.sheet.enseignantsheet.forEach(es => {
            if (es.type === 'ENCADREUR') {
              this.exist_e = true;
            } if (es.type === 'RAPPORTEUR') {
              this.exist_r = true;
            }  if (es.type === 'VALIDATEUR') {
              this.exist_v = true;
            }
          });
        }
      }, error =>  {
        if (error.status === 404) {
          this.notFound = 'assets/images/404/404.png';
        }
       });
    }

    if (this.user.role === 'Enseignant') {
      this.sheetService.sheet(this.sheet_id).subscribe(data => {
        if (data) {
          data.enseignantsheet.forEach(es => {
            if (es.enseignant.id === this.user.id ) {
              this.sheet = data;
            }
            if (es.type === 'ENCADREUR') {
              this.exist_e = true;
            } if (es.type === 'RAPPORTEUR') {
              this.exist_r = true;
            }  if (es.type === 'VALIDATEUR') {
              this.exist_v = true;
            }
          });
          if (! this.sheet) {
            this.notFound = 'assets/images/404/404.png';
          }
        }
      }, error =>  {
         if (error.status === 404) {
           this.notFound = 'assets/images/404/404.png';
         }
      });
    }
  }

  affect(type) {
    const modalRef = this.modal.open(AffectSheetpfeEnseignantComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.sheet = this.sheet;
    modalRef.componentInstance.action = 'Affect';

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry.type === 'validateur') {
        this.sheet.etat = 'PRE_VALIDATE';
        this.exist_v = true;
        this.enseignantsheet = new Enseignantsheet(receivedEntry.enseignant, 'VALIDATEUR' );
        this.sheet.enseignantsheet.push( this.enseignantsheet );
      } if (receivedEntry.type === 'encadreur') {
        this.exist_e = true;
        this.enseignantsheet = new Enseignantsheet(receivedEntry.enseignant, 'ENCADREUR' );
        this.sheet.enseignantsheet.push( this.enseignantsheet );
      } if (receivedEntry.type === 'rapporteur') {
        this.exist_r = true;
        this.enseignantsheet = new Enseignantsheet(receivedEntry.enseignant, 'RAPPORTEUR' );
        this.sheet.enseignantsheet.push( this.enseignantsheet );
      }
    });

  }

  valid(type) {
    const modalRef = this.modal.open(ValidSheetpfeComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.sheet = this.sheet;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        this.sheet.etat = receivedEntry.etat;
        this.sheet.note = receivedEntry.note;
    });

  }

  update() {
    this.edit = true;
  }
  showDetails() {
   this.details = this.details === true ? false : true ;
  }
  hide() {
    this.edit = false;
  }
  updateEnseignant(type) {
    const modalRef = this.modal.open(AffectSheetpfeEnseignantComponent);
    modalRef.componentInstance.action = 'Update';
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.sheet = this.sheet;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry.type === 'encadreur') {
        this.sheet.enseignantsheet.forEach(es => {
          if (es.type === 'ENCADREUR') {
            es.enseignant = receivedEntry.enseignant;
          }
        });
      } if (receivedEntry.type === 'rapporteur') {
          this.sheet.enseignantsheet.forEach(es => {
            if (es.type === 'RAPPORTEUR') {
              es.enseignant = receivedEntry.enseignant;
            }
          });
      }
    });

  }

  verifEnseignant(type) {
    return this.sheet.enseignantsheet.filter( es => es.enseignant.id === this.user.id && es.type === type).length ? true : false;
  }
  note(type) {
    const modalRef = this.modal.open(NoteSheetpfeComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.sheet = this.sheet;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (type === 'encadreur') {
        this.sheet.noteEncadreur = receivedEntry;
      } else {
        this.sheet.noteRapporteur = receivedEntry;
      }
    });
  }
  setSheet(sheet) {
    this.sheet = sheet;
  }
}
