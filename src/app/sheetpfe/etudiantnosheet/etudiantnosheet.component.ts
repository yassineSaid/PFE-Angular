import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../Models/etudiant';
import {DatePipe} from '@angular/common';
import {SheetService} from '../sheet.service';

@Component({
  selector: 'app-etudiantnosheet',
  templateUrl: './etudiantnosheet.component.html',
  styleUrls: ['./etudiantnosheet.component.scss']
})
export class EtudiantnosheetComponent implements OnInit {

  alert: Boolean = false;
  disabled: Boolean = false;
  startyear: any;
  toyear: any ;
  errorDate: Boolean = false;
  etudiants: Etudiant[] = [];

  constructor(private sheetService: SheetService, private datePipe: DatePipe) { }

  ngOnInit() {

    this.startyear = this.datePipe.transform(new Date(),'yyyy-MM');
    this.toyear = this.datePipe.transform(new Date(),'yyyy-MM');
    this.getEtudiantNoSheet();
  }

  sendMail() {
    this.alert = false;
    this.disabled = true;
    if ( this.errorDate === false) {
      this.sheetService.sendMail(this.etudiants).subscribe(success => {
        if (success) {
          this.alert = true;
          this.disabled = false;
        }
      });
    }
  }

  updateForm() {
    this.errorDate = false;
    this.getEtudiantNoSheet();
  }

  getEtudiantNoSheet() {
    if (this.startyear.substring(0, 4) > this.toyear.substring(0, 4)) {
      this.errorDate = true;
    }
    if (! this.startyear) {
      this.startyear =  this.datePipe.transform(new Date(),'yyyy-MM');
      this.errorDate = false;
    }
    if (! this.toyear) {
      this.toyear =  this.datePipe.transform(new Date(),'yyyy-MM');
      this.errorDate = false;
    }
    this.etudiants = [];
    this.sheetService.studentnoSheet(this.startyear.substring(0, 4), this.toyear.substring(0, 4)).subscribe(data => {
        if (data) {
          this.etudiants = data;
        }
    });
  }



}
