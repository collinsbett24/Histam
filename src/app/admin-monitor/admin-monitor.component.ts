import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../api.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgxLoadingModule } from 'ngx-loading';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-monitor',
  templateUrl: './admin-monitor.component.html',
  providers: [ApiService, DecimalPipe],
  styleUrls: ['./admin-monitor.component.css']
})
export class AdminMonitorComponent implements OnInit {
  
  collection = [];
  public loading = false;

  message: string; 


  constructor(public apiService:ApiService) { }

  ngOnInit(){
  this.loading = true;
  	this.apiService.getData()
      .subscribe(
        data => {
        this.loading = false;
          this.collection = data;
          //console.log(data);
        },
        error => {
          //console.log(error);

        });    
  }
  public download(pdfId:number){
    Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                this.loading = true;
                this.apiService.deleteData(pdfId).subscribe(
                response =>{
               
                });
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
               this.loading = false;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your file is safe :)',
                'error'
              )
            }
          })
 
  }



}
