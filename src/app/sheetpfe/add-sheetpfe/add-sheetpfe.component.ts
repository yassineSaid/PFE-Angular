import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-sheetpfe',
  templateUrl: './add-sheetpfe.component.html',
  styleUrls: ['./add-sheetpfe.component.scss']
})
export class AddSheetpfeComponent implements OnInit {

  @Input() edit
  constructor() { }

  ngOnInit() {
  }

}
