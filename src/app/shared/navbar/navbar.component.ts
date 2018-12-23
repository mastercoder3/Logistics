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
  user;

  constructor(private router: Router, private auth: AuthService) {
    this.loggedIn();
   }

  ngOnInit() {
  }

  
  loggedIn(){
    this.auth.checkLoginStatus().subscribe(user =>{
      if(user){
        this.uid = true;
        this.user = user;
        localStorage.setItem('tuid',user.uid);
      }
      else{
        this.uid = false;
        localStorage.removeItem('tuid');
      }
    })
  }

  signout(){
    localStorage.removeItem('tuid')
    localStorage.removeItem('booking')
    this.auth.logout();
     this.router.navigate(['']);
  }


}
