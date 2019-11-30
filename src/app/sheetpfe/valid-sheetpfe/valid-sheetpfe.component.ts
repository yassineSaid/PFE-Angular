import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-valid-sheetpfe',
  templateUrl: './valid-sheetpfe.component.html',
  styleUrls: ['./valid-sheetpfe.component.scss']
})
export class ValidSheetpfeComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public type;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }
  valid() {
    this.passEntry.emit('edeqcdvzevz');
    this.modal.close();
  }

}
