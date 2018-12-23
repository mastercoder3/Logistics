import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {

  lat: number = 25.0997528;
  lng: number = 55.1556513;
  order;
  par;
  phonecode;
  constructor(private dialog: MatDialog,private helper: HelperService, private router: Router, private auth: AuthService) {
   }

  ngOnInit() {
    this.auth.checkLoginStatus().subscribe(user =>{
      if(user){
        if(!localStorage.getItem('booking'))
         this.router.navigate(['']);
      }
      else if(localStorage.get('booking') || user){
        this.router.navigate(['/signin']);
      }
      else
      this.router.navigate(['']);

    });

    this.order = JSON.parse(localStorage.getItem('booking'));
    this.helper.getCountryPhoneCodes()
      .subscribe(res => {
          this.par = res;
          this.phonecode = this.par.filter(data => data.name.toLowerCase() === this.order.destination.toLowerCase());
          this.order.destCode = `(${this.phonecode[0].dial_code})`;
          this.phonecode = this.par.filter(data => data.name === 'United Arab Emirates');
          this.order.fromCode = `(${this.phonecode[0].dial_code})`;
          let x = {from: this.order.from, destination: this.order.destination, weight: this.order.weight, price: this.order.price, destCode: this.order.destCode, fromCode: this.order.fromCode, city: this.order.city};
          localStorage.setItem('booking', JSON.stringify(x));    
          setTimeout( ()=>{
                this.openDialog();
              }, 500);
      })

  }

  openDialog(): void {

    const dialogRef = this.dialog.open(CreateDialogComponent, {
      minWidth: '340px',
      maxHeight: '95%',
      panelClass: ['animated','slideInUp'],
      disableClose: true,
      autoFocus: false,
      data: {se: ''}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined){
        this.router.navigate(['/orders']);
      }
    });
  }

}
