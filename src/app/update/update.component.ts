import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

public loading = false;
public alert: boolean = false;

editForm = new FormGroup({
	name:  new FormControl(''),
	description: new FormControl(''),
	selectedFile: new FormControl('')
})

 constructor(public fb: FormBuilder, private http: HttpClient,private router:Router,private route:ActivatedRoute, private dataService: ApiService) {
   }

  ngOnInit() {
  	this.dataService.getDoc(this.route.snapshot.params.id).
  	subscribe((result)=>{
  		this.editForm = new FormGroup({
	name:  new FormControl(result[0].name),
	description: new FormControl(result[0].description),
	selectedFile: new FormControl(result[0].filename)
})
  	}
  	)
  }

  onFileChanged(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({selectedFile: file});
    this.editForm.get('selectedFile').updateValueAndValidity()
    //console.log(this.selectedFile);
  }

  updateData(editForm)
  {
  this.loading = true;
  	var formData: any = new FormData();
  	formData.append("id", this.route.snapshot.params.id);
      formData.append("name", this.editForm.get('name').value);
      formData.append("description", this.editForm.get('description').value);
      formData.append("myfile", this.editForm.get('selectedFile').value);

      this.dataService.updateDoc(formData).
  		subscribe((result)=>{
  	})
  	this.loading = false;
  	this.alert = true;
  }
  closeAlert()
  {
  	this.alert = false;
  }

}
