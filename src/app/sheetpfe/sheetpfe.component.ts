import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../Models/user';
import {SheetPFE} from '../Models/sheet-pfe';
import {SheetService} from './sheet.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Categorie} from '../Models/categorie';
import {Entreprise} from '../Models/entreprise';

@Component({
  selector: 'app-sheetpfe',
  templateUrl: './sheetpfe.component.html',
  styleUrls: ['./sheetpfe.component.scss']
})
export class SheetpfeComponent implements OnInit {
  user: User;
  sheets: SheetPFE[] = [];
  notFound: any;
  param: any;
  etat: any = 'ALL';
  type: any = 'ALL';
  year: any;
  toyear: any;
  pays: any = 'ALL';
  categorie: Number = 0;
  categories: Categorie[];
  entreprises: Entreprise[];
  constructor(private route: ActivatedRoute, private sheetService: SheetService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService, private datePipe: DatePipe) { }
  ngOnInit() {

    this.user = this.storage.get('user');
    if (this.user.role === 'ChefDeDepartement') {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        if (this.param) {
          this.notFound = '';
          if (this.param === '_rapporteur') {
            this.param = 'waitRapporter';
          } else if (this.param === '_encadreur') {
            this.param = 'waitEncadreur';
          } else if (this.param === '_note') {
            this.param = 'waitNote';
          } else if (this.param === '_accepted') {
            this.param = 'accepted';
          } else {
            this.notFound = 'assets/images/404/404.png';
          }
          this.sheetService.sheet(this.param).subscribe(data => {
            this.sheets = [];
            if (data) {
              this.sheets = data;
            }
          }, error =>  {
            if (error.status === 404) {
              this.notFound = 'assets/images/404/404.png';
            }
          } );
        } else {
          this.notFound = 'assets/images/404/404.png';
        }
      });

    }
    if (this.user.role === 'DirecteurDesStages') {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        if (this.param) {
          this.notFound = '';
          if (this.param === '_planning') {
            this.sheets = [];
            this.sheetService.sheet('waitPlaning').subscribe(data => {
              if (data) {
                this.sheets = data;
              }
            }, error =>  {
              if (error.status === 404) {
                this.notFound = 'assets/images/404/404.png';
              }
            } );
          } else {
            this.notFound = 'assets/images/404/404.png';
          }
        } else {
          this.year = this.datePipe.transform(new Date(),'yyyy-MM');
          this.getSheetPFEs();
          this.sheetService.categories().subscribe(data => {
            if (data) {
              this.categories = data;
            }
          });
          this.sheetService.entreprises().subscribe(data => {
            if (data) {
              this.entreprises = Array.from(data.reduce((m, e) => m.set(e.pays, e), new Map()).values());
            }
          });
        }
      });
    }
    if ( this.user.role === 'Enseignant' ) {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        if ( this.param ) {
          this.notFound = '';
        } else {
          this.year = this.datePipe.transform(new Date(),'yyyy-MM');
          this.toyear =  this.datePipe.transform(new Date(),'yyyy-MM');
          this.getSheetPFEs();
        }
      });
    }

  }
  getSheetPFEs() {
    if (! this.year) {
      this.year =  this.datePipe.transform(new Date(),'yyyy-MM');
    }
    if (! this.toyear) {
      this.toyear =  this.datePipe.transform(new Date(),'yyyy-MM');
    }
    if (this.user.role === 'DirecteurDesStages') {
      this.sheetService.sheets(this.etat, this.year.substring(0, 4), this.pays, this.categorie).subscribe(data => {
        this.sheets = []
        if (data) {
          if (this.etat === 'DEFAULT' && this.year.substring(0, 4) === this.datePipe.transform(new Date(), 'yyyy-MM').substring(0, 4)) {
            data.reverse();
          }
          this.sheets = data;
        }
      }, error =>  {
        if (error.status === 404) {
          this.notFound = 'assets/images/404/404.png';
        }
      } );
    }

    if (this.user.role === 'Enseignant') {
      this.sheets = []
      this.sheetService.enseignantSheets(this.year.substring(0, 4) , this.toyear.substring(0, 4) , this.type).subscribe(data => {
        this.sheets = []
        if (this.type === 'ALL') {
          this.sheets =   Array.from(data.reduce((m , s) => m.set(s.id, s), new Map()).values());
        } else {
          this.sheets = data;
        }
      }, error =>  {
        if (error.status === 404) {
          this.notFound = 'assets/images/404/404.png';
        }
      } );
    }
  }

  reset() {
    this.type = 'ALL'
    this.etat = 'ALL';
    this.pays = 'ALL';
    this.year = this.datePipe.transform(new Date(),'yyyy-MM');
    this.toyear = this.datePipe.transform(new Date(),'yyyy-MM');
    this.categorie = 0;
  }

  enseignantType(sheet: SheetPFE) {
    const enseignantSheets: string[] = [];
    sheet.enseignantsheet.forEach(es => {
      if ( es.enseignant.id === this.user.id) {
            enseignantSheets.push(es.type);
      }
    });
    return enseignantSheets;
  }
}
