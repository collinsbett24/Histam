import { Component, OnInit } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import Swal from 'sweetalert2';

//import { Mpesa } from 'mpesa-api';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DownloadService } from '../download.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common'
import * as fileSaver from 'file-saver';

declare var require: any 
const FileSaver = require('file-saver');

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
public loading = false;
form:FormGroup;
amount = 5;
p_number = '';
collection = [];
  mpesa_res = [];
  mpesa_query_res = [];

 public CRequestID: string = '';

  public CheckoutRequestID: string;
  public responseCode: string;

public pdfUrl: string;
public pdfName: string;

public resultCode: number;

    constructor(private location: Location, public fb: FormBuilder, private http: HttpClient,private router:Router, private dataService:ApiService, private downloadService:DownloadService, private route:ActivatedRoute) {
      this.form = this.fb.group({
  		p_number: ['', Validators.required]
  	});
    
   }

  ngOnInit(){
  }

  goBack(){
      this.location.back();
  }

  Pay(){
  this.loading = true;
    this.dataService.payDoc(this.p_number)
      .subscribe(data => {
      let cRId = JSON.parse(data);
      console.log(cRId.ResponseCode);
      if(cRId.ResponseCode == 0){
      this.CRequestID = cRId.CheckoutRequestID;
      Swal.fire({
            title: 'Wait for stk processing',
            text: 'confirm payment to begin download',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes, have paid!',
            cancelButtonText: 'No, cancel'
          }).then((result) => {
            if (result.value) {
  
              this.dataService.queryRequest(this.CRequestID).subscribe(response =>{
                  let mpesa_res = JSON.parse(response);
                  //console.log(response);
                  this.resultCode = mpesa_res.ResultCode;
                  //console.log(this.resultCode); 
                  if (mpesa_res.ResultCode==0){ 
                        Swal.fire(
                              'Notice!',
                              'Payment Recieved. Your file download will begin shortly.',
                              'success'
                            );        
                      const Id = this.route.snapshot.paramMap.get('id');
                        this.dataService.getDoc(Id).subscribe(response => {
                        this.collection = response;
                          this.pdfUrl = this.collection[0].path;
                        // console.log(this.pdfName = this.collection[0].filename);
                          FileSaver.saveAs(this.pdfUrl, this.pdfName);
                        });
                        this.loading = false;
                        const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '';
                        this.router.navigate([redirect]);
                   } else if (mpesa_res.ResultCode==1032){
                      Swal.fire(
                        'Cancelled',
                        'Your payment failed:Cancelled by user!',
                        'error'
                      )
                      this.loading = false;
                   } else {
                      Swal.fire(
                        'Cancelled',
                        'Your payment failed: caused By Insufficient balance!',
                        'error'
                      )
                      this.loading = false;
                   }
              })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'File download failed!',
                'error'
              )
              this.loading = false;
            }
          });                    
        }else {
                Swal.fire(
                  'Cancelled',
                  'Your payment failed: A Simillar transaction is in process.',
                  'error'
                )
                this.loading = false;
             }
       })
    }

    DownloadF(){
        Swal.fire({
            title: 'Wait for stk processing',
            text: 'confirm payment to begin download',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes, have paid!',
            cancelButtonText: 'No, cancel'
          }).then((result) => {
            if (result.value) {
            this.loading = true;
              this.dataService.queryRequest(this.CRequestID).subscribe(response =>{
                  let mpesa_res = JSON.parse(response);
                  //console.log(response);
                  this.resultCode = mpesa_res.ResultCode;
                  //console.log(this.resultCode); 
                  if (mpesa_res.ResultCode==0){ 
                        Swal.fire(
                              'Notice!',
                              'Payment Recieved. Your file download will begin shortly.',
                              'success'
                            );        
                      const Id = this.route.snapshot.paramMap.get('id');
                        this.dataService.getDoc(Id).subscribe(response => {
                        this.collection = response;
                          this.pdfUrl = this.collection[0].path;
                        // console.log(this.pdfName = this.collection[0].filename);
                          FileSaver.saveAs(this.pdfUrl, this.pdfName);
                        });
                        this.loading = false;
                        const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '';
                        this.router.navigate([redirect]);
                   } else if (mpesa_res.ResultCode==1032){
                      Swal.fire(
                        'Cancelled',
                        'Your payment failed:Cancelled by user',
                        'error'
                      )
                      this.loading = false;
                   } else {
                      Swal.fire(
                        'Cancelled',
                        'Your payment failed: caused By Insufficient balance',
                        'error'
                      )
                      this.loading = false;
                   }
              })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'File download failed:)',
                'error'
              )
              this.loading = false;
            }
          }); 
    }
}


//const http$ = this.http.get<Course[]>('/api/courses'); 

  //      http$.subscribe(
    //        res => console.log('HTTP response', res),
      //      err => console.log('HTTP Error', err),
        //    () => console.log('HTTP request completed.')
        //);