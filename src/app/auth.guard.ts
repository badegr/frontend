import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RestService } from './rest.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private restService: RestService, private router: Router) {}

  canActivate(): boolean {
    if (this.restService.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
