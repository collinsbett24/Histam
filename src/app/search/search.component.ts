import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import Swal from 'sweetalert2';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

import { DownloadService } from '../download.service';

import * as fileSaver from 'file-saver';

declare var require: any 
const FileSaver = require('file-saver');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
public loading = false;
selectedValue: string;
selectedOption: any;

  currentTutorial:any = null;
  message = '';
  title = '';

  collection = [];
  fName: any[] = [];

  constructor(private apiService:ApiService, private downloadService:DownloadService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(){
      this.apiService.getFname().subscribe((fileinfo: any)=>{
      this.fName = fileinfo;
      })
  }

 searchTitle(){
 this.collection = [];
 this.loading = true;
    this.apiService.findByTitle(this.title)
      .subscribe(
        data => {
        if(data.length==0){
        this.loading = false;
        Swal.fire('Oops...', 'You are unlucky today, check for another document!', 'error')
         // this.message = 'No data found';
        }else{
        this.loading = false;
          this.message ='';
          this.collection = data;
          //console.log(data);
          }
        },
        error => {
          //console.log(error);
          this.loading = false;

        });
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item
  }
}
