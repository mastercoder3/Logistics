import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  showError = false;
  errMsg;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private api: ApiService) {
    if(localStorage.getItem('tuid'))
    this.router.navigate(['']);
   }

  ngOnInit() {
    this.auth.checkLoginStatus().subscribe(user =>{
      if(user)
        this.router.navigate(['']);
    });
    this.form = this.fb.group({
      fname: ['',Validators.required],
      lname: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  signin(){
    this.router.navigate(['/signin']);
  }

  submit(form){
    this.auth.signup(form.value.email, form.value.password)
      .then(res =>{
        this.api.createUser(res.user.uid,{
          firstName: form.value.fname,
          lastName: form.value.lname,
          country: form.value.country,
          email: form.value.email,
          password: form.value.password
        })
          .then(ress => {
            localStorage.setItem('tuid',res.user.uid)
            this.router.navigate(['']);
          }, err =>{
            this.showError = true;
        this.errMsg = err.message;
        setTimeout( ()=>{
          this.showError = false;
        }, 5000); 
          })
      }, err => {
        this.showError = true;
        this.errMsg = err.message;
        setTimeout( ()=>{
          this.showError = false;
        }, 5000);
      });
  }

}
