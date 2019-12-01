import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../Models/user';
import {SheetPFE} from '../Models/sheet-pfe';
import {SheetService} from './sheet.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sheetpfe',
  templateUrl: './sheetpfe.component.html',
  styleUrls: ['./sheetpfe.component.scss']
})
export class SheetpfeComponent implements OnInit {
  user: User;
  sheets: SheetPFE[];
  notFound: any;
  param: any;
  constructor(private route: ActivatedRoute, private sheetService: SheetService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  ngOnInit() {
    this.user = this.storage.get('user');
    if (this.user.role === 'ChefDeDepartement') {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        if (this.param) {
          if (this.param === '_rapporteur') {
            this.param = 'waitRapporter';
          } else if (this.param === '_encadreur') {
            this.param = 'waitEncadreur';
          } else if (this.param === '_note') {
            this.param = 'waitNote';
          } else if (this.param === '_accepted') {
            this.param = 'accepted';
          }
          this.sheetService.sheet(this.param).subscribe(data => {
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
  }
}
