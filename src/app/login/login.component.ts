import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private cookiesService: CookieService , private formBuilder: FormBuilder , private authService: AuthService , private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    if (this.cookiesService.check('token')){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',],
      password: ['']
    })
  }

  get Form() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(this.Form.email.value , this.Form.password.value).subscribe(success => {
      if (success) {
        this.storage.set('user', success['user']);
        this.authService.broadcastLoginChange( success['user']);
        this.authService.broadcastLoggedInChange(true);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.authService.broadcastLoggedInChange(false);
      }
    });
  }

}
