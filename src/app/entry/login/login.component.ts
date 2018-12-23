import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  email: string;
  errMsg;
  showError:boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private auth: AuthService) { 
   }

  ngOnInit() {
    this.auth.checkLoginStatus().subscribe(user =>{
      if(user && !localStorage.getItem('booking'))
        this.router.navigate(['']);
    })
    this.form = this.fb.group({
      email: ['',Validators.compose([Validators.email, Validators.required])],
      password: ['',Validators.required]
    })
  }

  login(form){
    let email = form.value.email;
    let password = form.value.password;
    this.auth.login(email,password)
    .then(res =>{
      this.auth.setPersistance().then(() => {
        this.api.getUser(res.user.uid)
        .subscribe(data =>{
            if(data){
              localStorage.setItem('tuid', res.user.uid);
              if(localStorage.getItem('booking'))
                this.router.navigate(['/create-new'])
              else
                this.router.navigate(['']);
            }
           });
      });     

    }, err =>{
        this.showError = true;
        this.errMsg = err.message;
        setTimeout( ()=>{
          this.showError = false;
        }, 5000);
    })
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  forgotpassword(){
    if(this.email){
      this.auth.forgotPassword(this.email)
        .then(res =>{
          
        }, err =>{
          this.showError = true;
          this.errMsg = err.message;
        })
    }
  }


}
