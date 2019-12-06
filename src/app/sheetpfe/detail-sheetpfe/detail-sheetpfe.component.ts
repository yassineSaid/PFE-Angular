import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-sheetpfe',
  templateUrl: './detail-sheetpfe.component.html',
  styleUrls: ['./detail-sheetpfe.component.scss']
})
export class DetailSheetpfeComponent implements OnInit {

  @Input() sheet;
  constructor() { }

  ngOnInit() {
  }

}
