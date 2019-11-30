import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private authService:AuthService , private router:Router, private cookieService:CookieService) {
    
   }

   
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',],
      password: ['']
    })
  }

  get Form(){
    return this.loginForm.controls;
  }

  login(){
    this.authService.login(this.Form.email.value , this.Form.password.value).subscribe(success => {
      if(success) {
        this.router.navigate(['/dashboard'])
        console.log(this.cookieService.get('user'))
        this.authService.listAdmin().subscribe(response => {
          console.log(response);
        })
      }
    });
  }

}
