import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheetpfe',
  templateUrl: './sheetpfe.component.html',
  styleUrls: ['./sheetpfe.component.scss']
})
export class SheetpfeComponent implements OnInit {

  edit: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  update() {
    this.edit = true;
  }

}
