import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  message = '';
  form:FormGroup;
  public loading = false;
  alert: boolean = false;

    constructor(public fb: FormBuilder, private http: HttpClient,private router:Router, private dataService: ApiService) {
      this.form = this.fb.group({
  		name: ['', Validators.required],
  		description: ['', Validators.required],
      selectedFile: [null]
  	});
   }
   ngOnInit(): void {
  }
    onFileChanged(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({selectedFile: file});
    this.form.get('selectedFile').updateValueAndValidity()
    //console.log(this.selectedFile);
  }
   postdata(form){
   this.loading = true;
      var formData: any = new FormData();
      formData.append("name", this.form.get('name').value);
      formData.append("description", this.form.get('description').value);
      formData.append("myfile", this.form.get('selectedFile').value);

     this.dataService.addDoc(formData).
      subscribe(
      data => {
      this.loading = false;
      this.alert = true;
      },
      error =>{
        this.loading = false;
        alert("Failed to add data")
      });
  }
  closeAlert()
  {
    this.alert=false;
  }
  }


