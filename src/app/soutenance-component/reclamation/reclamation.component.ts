import {Component, Inject, OnInit} from '@angular/core';
import {SoutenanceServiceService} from '../soutenance-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Reclamation} from '../../Models/Reclamation';
import {User} from '../../Models/user';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  user: User;
  reclamation: Reclamation[];
  constructor( private httpService: SoutenanceServiceService ,      @Inject(LOCAL_STORAGE) private storage: WebStorageService ) { }


  ngOnInit() {
  }

}
