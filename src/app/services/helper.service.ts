import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  
  constructor(private http: Http) { }

  getCountries(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
    return this.http.get('./assets/data/countries.json',options)
    .pipe(map((this.extractData)))
  }

  getCities(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
    return this.http.get('./assets/data/cities.json',options)
    .pipe(map((this.extractData)))
  }

  getUAECities(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
    return this.http.get('./assets/data/uae.json',options)
    .pipe(map((this.extractData)))
  }

  extractData(res){
    let body = res.json();
    return body;
  }

  handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
    }

  getCountryPhoneCodes(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
    return this.http.get('./assets/data/phonecode.json',options)
    .pipe(map((this.extractData)))
  }

  simpleHttp(amount, token){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    //callrequest
    return this.http.post('http://localhost:3000/payments', {
     amount: amount.toString(),
     token: token
    }, options);

  }

}
