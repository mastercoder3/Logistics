import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $ :any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  
  neworders;
  orders;
  date: Array<any> = [];
  date1: Array<any> = [];
  userFilter ={
    orderid: ''
  };
  selected;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getData(localStorage.getItem('tuid'));
  }

  getData(id){
    this.api.getNewOrdersById(id)
      .subscribe(res => {
        this.neworders = res;
        this.neworders.forEach(a => {
          this.date.push(new Date(a.date.toDate()).toDateString());
        });
      });

    this.api.getOrdersById(id)
    .subscribe(res =>{
      this.orders = res;
      this.orders.forEach(a => {
        this.date1.push(new Date(a.date.toDate()).toDateString());
      });
    })
  }

  newOrderClicked(item,i){
    $('#Orders').modal('show');
    this.selected = item;
  }

}
