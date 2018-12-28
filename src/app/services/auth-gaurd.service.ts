import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router, private auth: AngularFireAuth) { }

  canActivate(): boolean{
    if(localStorage.getItem('tuid'))
      return true;
    else
      return false;
  }

}
