import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
	coupeHidden:boolean;
  sedanHidden:boolean;
  toyotaHidden:boolean;

  constructor() { }

  ngOnInit(){
  	this.coupeHidden=false;
    this.sedanHidden=true;
    this.toyotaHidden=true;
  }

  onCoupe(){
    this.coupeHidden=false;
    this.sedanHidden=true;
    this.toyotaHidden=true;
    }
   onSedan(){
    this.coupeHidden=true;
    this.sedanHidden=false;
    this.toyotaHidden=true;
    }
   onToyota(){
    this.coupeHidden=true;
    this.sedanHidden=true;
    this.toyotaHidden=false;
    }

}
