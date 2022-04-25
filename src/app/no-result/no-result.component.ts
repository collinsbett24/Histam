import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { NgxLoadingModule } from 'ngx-loading';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.css']
})
export class NoResultComponent implements OnInit {

  noSerched = [];

public loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(){
   this.loading = true;
    this.apiService.noSerc()
      .subscribe(
        data => {
        	this.noSerched = data;
        	this.loading = false;
        },
        error => {
         // console.log(error);
          this.loading = false;
        });
  }
  public delete(name:string){
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
                this.apiService.deleteTerm(name).subscribe(
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
