import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-least-searched',
  templateUrl: './least-searched.component.html',
  styleUrls: ['./least-searched.component.css']
})
export class LeastSearchedComponent implements OnInit {

  leastSerched = [];

public loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(){
   this.loading = true;
    this.apiService.leastSerc()
      .subscribe(
        data => {
        	this.leastSerched = data;
        	this.loading = false;
        },
        error => {
         // console.log(error);
          this.loading = false;
        });
  }
}
