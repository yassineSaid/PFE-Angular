import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AffectSheetpfeEnseignantComponent} from '../affect-sheetpfe-enseignant/affect-sheetpfe-enseignant.component';
import {ModalManager} from 'ngb-modal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ValidSheetpfeComponent} from '../valid-sheetpfe/valid-sheetpfe.component';
import {SheetService} from '../sheet.service';

@Component({
  selector: 'app-show-sheetpfe',
  templateUrl: './show-sheetpfe.component.html',
  styleUrls: ['./show-sheetpfe.component.scss']
})
export class ShowSheetpfeComponent implements OnInit {

  @Output() edit = new EventEmitter<any>();
  details: Boolean = false;
  constructor(private modal: NgbModal, private sheetService: SheetService) { }

  ngOnInit() {

    this.sheetService.sheet().subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }

  affect(type) {
    const modalRef = this.modal.open(AffectSheetpfeEnseignantComponent);
    modalRef.componentInstance.type = type;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
    });

  }

  valid(type) {
    const modalRef = this.modal.open(ValidSheetpfeComponent);
    modalRef.componentInstance.type = type;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
    });

  }

  update() {
    this.edit.emit();
  }
  showDetails() {
   this.details = this.details === true ? false : true ;
  }
}
