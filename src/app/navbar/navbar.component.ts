import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../Models/user';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { isDefined } from '@angular/compiler/src/util';
import { AuthService } from '../login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit,OnDestroy {
  user: User;
  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(config: NgbDropdownConfig, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private authService:AuthService, private cookieService:CookieService, private router:Router) {
    config.placement = 'bottom-right';
    this.authService.user.subscribe((val) => {
      this.user=val;
    });
    this.start();
  }

  ngOnInit() {
      this.user = this.storage.get('user');
      console.log(this.user);
  }
  
  ngOnDestroy(): void {
    this.stop();
  }

  private storageEventListener(event: StorageEvent) {
    console.log(event);
    if (event.storageArea == localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); }
      catch (e) { v = event.newValue; }
      console.log(event)
    }
  }
  
  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
  }

  logout() {
    this.cookieService.delete('token');
    this.authService.broadcastLoggedInChange(false);
    this.router.navigate(['/login']);
  }

}
