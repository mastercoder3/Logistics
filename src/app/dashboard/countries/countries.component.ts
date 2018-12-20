import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { HelperService } from 'src/app/services/helper.service';

export interface DialogData {
  code: string;
  name: string;
}


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries;

  constructor(private dialogRef: MatDialogRef<CountriesComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: DialogData, private helper: HelperService) { }

  ngOnInit() {
    this.helper.getCountries()
      .subscribe(res =>{
        this.countries = res;
      });
  }

  selected(item){
    this.data.name = item.name;
    this.data.code = item.code;
    this.dialogRef.close(this.data);
  }

}
