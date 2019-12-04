import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {not} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-valid-sheetpfe',
  templateUrl: './valid-sheetpfe.component.html',
  styleUrls: ['./valid-sheetpfe.component.scss']
})
export class ValidSheetpfeComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public type;
  @Input() public sheet;
  note: any;
  error: any;
  disabled: Boolean = false;
  constructor(public modal: NgbActiveModal, private sheetService: SheetService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
  }
  valid() {
    if (! this.error) {
      this.error = 'The note required ';
    } else {
      this.disabled = true;
      if (this.storage.get('user').role === 'DirecteurDesStages') {
        this.sheetService.validsheetByDirecteur(this.sheet.id, this.type.toUpperCase()).subscribe(success => {
          this.passEntry.emit(this.type.toUpperCase());
          this.modal.close();
        });
      }
      if (this.storage.get('user').role === 'Enseignant') {
        let note: String = 'ACCEPTED';
        let type: String = 'REQUEST';
        if (this.note) {
          note = this.note;
        }
        if (this.type === 'accepted') {
          type = 'VALIDATE';
        }
        this.sheetService.validsheetByEnseignant(this.sheet.id, type, note).subscribe(success => {
          const obj = {
            'etat': type,
            'note': note
          }
          this.passEntry.emit(obj);
          this.modal.close();
        });
      }
    }
  }

}
