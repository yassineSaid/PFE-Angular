import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private authService:AuthService , private router:Router) {
    
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
    console.log(this.Form.email.value)
    console.log(this.Form.password.value)
    this.authService.login(this.Form.email.value , this.Form.password.value).subscribe(success => {
      if(success) {
        this.router.navigate(['/dashboard'])
      }
    });
  }

}
