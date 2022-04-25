import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  items = [];


  addToCart(item){
  	this.items.push(item);
  }

  getItems(){
  	return this.items;
  }

  clearCart(){
  	this.items = [];
  	return this.items;
  }
}
