import { Component, OnInit, Inject } from '@angular/core';
import {items} from "./sidebar_items";
import { AuthService } from '../login/auth.service';
import { User } from '../Models/user';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  items=items;
  user:User=null;

  constructor(private authService:AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { 
    this.authService.user.subscribe((val) => {
      this.user=val;
    });
  }

  ngOnInit() {
    this.user = this.storage.get('user');
  }

}
