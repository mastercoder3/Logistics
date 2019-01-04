import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CountriesComponent } from '../countries/countries.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filteredCities = [];
  stateCtrl = new FormControl();
  filteredCountries = [];
  stateCtrl1 = new FormControl();
  countries;
  prices;
  rates;
  pickup;
  countryCode;
  states = [
    {
      name:  "Abu Dhabi"
    },
    {
      name: "Al Ain"
    },
    {
      name: "Al Khan"
    },
    {
      name: "Ar Ruways"
    },
    {
      name: "As Satwah"
    },
    {
      name: "Dayrah"
    },
    {
      name: "Dubai"
    },
    {
      name:  "Fujairah"
    },
    {
      name: "Ras al-Khaimah"
    },
    {
      name: "Sharjah"
    }
  ];
  form: FormGroup;
  selectedCountry = {
    name: 'United Kingdom',
    code: 'GB'
  };
  temp;
  showPrice:Array<any>= [];
  uae;
  
  constructor(private helper: HelperService,private dialog: MatDialog, private fb: FormBuilder, private api: ApiService, private router: Router) { 
   

    this.helper.getCities()
      .subscribe(res =>{
        this.temp = res;
        // this.countries = this.countries.filter(data => data === this.selectedCountry.name)
        Object.keys(this.temp).forEach(a =>{
          if(a === this.selectedCountry.name)
              this.countries = this.temp[a]
        })
      });

      this.helper.getUAECities()
        .subscribe(res => {
          this.uae = res;
        })
  }

  showCities(event){

  }

  ngOnInit() {
    localStorage.removeItem('booking')
    
    this.form = this.fb.group({
      from: ['', Validators.required],
      weight: ['', Validators.required],
      destination: ['', Validators.required],
      price: ['',Validators.required]
  });
    this.onChanges();
    this.api.getPricingById('pickup')
      .subscribe(res =>{
        this.pickup = res;
      });
  }

  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
   
    let x = this.uae.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
    return  x;
  }

    
  private _filterStates1(value: string) {

    const filterValue = value.toLowerCase();

    return this.countries.filter(state => state.toLowerCase().indexOf(filterValue) === 0);
  

}

onChanges(){
  this.form.get('from').valueChanges.subscribe(res =>{
    if(res.length > 0){
      this.filteredCities = this._filterStates(res);
    }
    else  
      this.filteredCities = undefined;
  })

  this.form.get('destination').valueChanges.subscribe(res =>{
    if(res.length > 0){
      this.filteredCountries = this._filterStates1(res);
    }
    else{
      this.filteredCountries = [];
    }
    let x = this.countries.filter(data => data.name === res);
    if(x.length !== 0)
      this.countryCode = x[0].code;
    if(res !== '' ){
      this.form.get('weight').valueChanges.subscribe(weigh => {
        if(weigh != 0){
          this.getPrices(res);
        }
      });
    }
  });

}

getPrices(dest){
  this.api.getPrice(this.selectedCountry.name)
    .pipe(map(actions => actions.map(a =>{
      const did = a.payload.doc.id;
      const data = a.payload.doc.data();
      return {did, ...data};
    })))
    .subscribe(res =>{
      this.rates = res;
      this.form.value.price = 0;
      this.showPrice = [];
      if(this.rates.length !== 0){
         let x  = this.rates[0].rates;
          this.prices = x.filter(data =>  data.maxweight >= this.form.get('weight').value  && this.form.get('weight').value > data.minweight && data.perkg === false);

          if(this.prices.length !== 0)
            this.form.value.price =  this.prices[0].price

          if(this.prices.length === 0){
            this.prices = x.filter(data =>  data.maxweight >= this.form.get('weight').value && data.minweight <= this.form.get('weight').value && data.perkg === true);
            if(this.prices.length !== 0)
            this.form.value.price =  this.prices[0].price * parseInt(this.form.get('weight').value);

          }

          this.showPrice.push(this.form.value.price);
          this.showPrice.push(parseInt(this.form.value.price) + this.pickup.charges);
      }
    
    });
}

  total;

  submit(form){

    let data = {
      from: this.form.get('from').value,
      destination: this.selectedCountry.name,
      city: this.form.get('destination').value,
      weight: this.form.get('weight').value,
      price: form.value.price
    };
    localStorage.setItem('booking',JSON.stringify(data));
    if(localStorage.getItem('tuid'))
        this.router.navigate(['/create-new']);
    else  
        this.router.navigate(['/signin'])
  }

  drop;

  onSelect(event){
    let x = parseInt(event);
    if(x === this.showPrice[0]){
      this.total = parseInt(this.showPrice[0])
      this.form.value.price = 'Saver Starting at: '+this.total;
    }
    else if(x === this.showPrice[1]){
      this.total = parseInt(this.showPrice[1])
      this.form.value.price = 'Pickup Service at: '+this.total;
    }
  }

  openCountries(): void{
    const dialogRef = this.dialog.open(CountriesComponent, {
      minWidth: '100px',
      maxHeight: '200px',
      panelClass: ['animated','slideInUp'],
      data: {name: 'United Kingdom', code: 'GB'}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectedCountry = result;
        this.form.controls['destination'].setValue('');
        Object.keys(this.temp).forEach(a =>{
          if(a === this.selectedCountry.name)
              this.countries = this.temp[a]
        })
      }
        
    });
  }


}
