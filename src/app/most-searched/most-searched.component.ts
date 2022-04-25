import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-most-searched',
  templateUrl: './most-searched.component.html',
  styleUrls: ['./most-searched.component.css']
})
export class MostSearchedComponent implements OnInit {

mostSerched = [];

public loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(){
   this.loading = true;
    this.apiService.mostSerc()
      .subscribe(
        data => {
        	this.mostSerched = data;
        	this.loading = false;
        },
        error => {
         // console.log(error);
          this.loading = false;
        });
  }

}
