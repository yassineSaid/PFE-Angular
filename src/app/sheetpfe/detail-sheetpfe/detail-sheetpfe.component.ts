import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ValidSheetpfeComponent} from '../valid-sheetpfe/valid-sheetpfe.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';

@Component({
  selector: 'app-detail-sheetpfe',
  templateUrl: './detail-sheetpfe.component.html',
  styleUrls: ['./detail-sheetpfe.component.scss']
})
export class DetailSheetpfeComponent implements OnInit {

  @Input() sheet;
  @Input() user;
  @Output() hide: EventEmitter<any> = new EventEmitter();

  constructor(private modal: NgbModal, private sheetService: SheetService) { }

  ngOnInit() {
  }

  valid(type) {
    const modalRef = this.modal.open(ValidSheetpfeComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.sheet = this.sheet;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if ( receivedEntry.etat === 'ACCEPTED') {
        this.sheet.sheetPFEModifications.forEach(m => {
          if (m.etat === 'DEFAULT') {
            this.sheet.title = m.title;
            this.sheet.description = m.description;
            this.sheet.problematic = m.problematic;
            this.sheet.features = m.features;
            this.sheet.categories = m.categories;
          }
        });
      }
      this.hide.emit();
    });

  }

}
