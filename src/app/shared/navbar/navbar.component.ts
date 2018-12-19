import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uid;

  constructor(private router: Router, private auth: AuthService) {
    this.loggedIn();
   }

  ngOnInit() {
  }

  
  loggedIn(){
    this.auth.checkLoginStatus().subscribe(user =>{
      if(user){
        this.uid = true;
      }
      else{
        this.uid = false;
      }
    })
  }

  signout(){
    localStorage.removeItem('tuid')
    localStorage.removeItem('booking')
    this.auth.logout();
    // this.router.navigate(['']);
  }


}
