import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  
  
  search: string;
  order;
  tracking;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  track(){
    if(this.search !== ''){
      this.search = this.search.toUpperCase();
      this.api.getNewOrderByOrderId(this.search)
        .subscribe(res => {
          this.order = res;
           if(this.order.length === 0)
           {
            this.api.getOrderByOrderId(this.search)
              .subscribe(ress => {
                this.order = ress;
              });
           }
        });
      this.api.getTrackingInformation(this.search)
        .subscribe(res => {
          this.tracking = res;
        });
    }
  }


}
