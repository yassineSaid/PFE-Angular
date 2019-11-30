import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-affect-sheetpfe-enseignant',
  templateUrl: './affect-sheetpfe-enseignant.component.html',
  styleUrls: ['./affect-sheetpfe-enseignant.component.scss']
})
export class AffectSheetpfeEnseignantComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public type;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }
  affect() {
    this.passEntry.emit('edeqcdvzevz');
    this.modal.close();
  }
}
