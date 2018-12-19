import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      subject: ['',Validators.required],
      message: ['', Validators.compose([
        Validators.required, Validators.minLength(20)
      ])]
    });
  }

  send(form){
    let data = {
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message
    }
    this.api.contactUs(data)
      .then(res =>{
        this.router.navigate(['']);
      }, err =>{
        console.log(err.message);
      })
  }

}
