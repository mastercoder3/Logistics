import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router, private auth: AngularFireAuth) { }

  canActivate(): boolean{
    this.auth.authState.subscribe(user =>{
      if(user)
        return true;
      else
        return false;
    });
    return false;
  }

}
