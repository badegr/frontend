import { Component, OnInit } from '@angular/core';
import { RestService } from './../rest.service';
import { LoginData } from '../models/loginData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  title = 'signin';

  public loginData: LoginData;

  constructor(private restService: RestService, private router: Router) {
    this.loginData = new LoginData();
  }

  ngOnInit() {
    if (this.restService.loggedIn) {
      this.router.navigateByUrl('/search');
    }
  }

  authUser() {
    this.restService
      .authUser(this.loginData)
      .subscribe(x => this.authRespons(x), x => this.authError(x));
  }

  authRespons(respons: any) {
    localStorage.setItem('token', respons);
    this.router.navigateByUrl('/search');
  }

  authError(response: any) {}
}
