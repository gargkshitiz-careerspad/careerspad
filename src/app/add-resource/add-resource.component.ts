import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  isPageLoading = true;
  isAddResourceProcess = false;
  submitted = false;
  addResourceForm: FormGroup;
  specArr = [];
  subCatgArr = [];
  imgArr = [];
  showHideImages = false;
  selectedImgShow = false;
  selectedImgName = '';
  showImgErr = false;
  showDescErr = false;
  showExternalUrlField = false;
  previewResourceObj = {};
  userobj = {};
  showResourcePreview = false;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.loadSpeciality();
  }
  loadSpeciality(){
    let params = new HttpParams();
    this.api.get('/getSpeciality.php', params).subscribe(resp => {
      this.isPageLoading = false;
      this.specArr = resp;
      this.initAddResourceForm();
    });
  }
  get f() { return this.addResourceForm.controls; }


  initAddResourceForm() {
    this.addResourceForm = this.formBuilder.group({
      catg: ['', Validators.required],
      sub_catg: ['', Validators.required],
      title: ['', Validators.required],
      tagLine: ['', Validators.required],
      blogType: ['0', Validators.required],
      description: [''],      
      externalURL: [''],
      img: [''],
    });
    this.addResourceForm.get('blogType').valueChanges.subscribe(checked => {      
      if (checked=='1') {
        this.showExternalUrlField = true;
        this.addResourceForm.get('externalURL').setValidators([Validators.required]);
      } else {
        this.showExternalUrlField = false;
        this.addResourceForm.get('externalURL').setValidators(null);
      }
      this.addResourceForm.get('externalURL').updateValueAndValidity();
    });
  }
  onSubmit(){
    this.submitted = true;    
    this.showImgErr = false;
    this.showDescErr = false; 
    if (this.addResourceForm.invalid || this.addResourceForm.get('img').value=='' || this.addResourceForm.get('description').value=='') {
      if(this.addResourceForm.get('img').value==''){
        this.showImgErr = true;
      }
      else{
        this.showImgErr = false;
      }
      if(this.addResourceForm.get('description').value==''){
        this.showDescErr = true;
      }
      else{
        this.showDescErr = false;
      }    
      return;
    }
    this.previewResourceObj = {
      sub_c_name: this.addResourceForm.get('title').value,
      sub_c_img: this.selectedImgName,
      tag_line: this.addResourceForm.get('tagLine').value,
      uploadByImg: this.userobj['pic'],
      uploadByName: this.userobj['name']
    }
    this.showResourcePreview = true;
  }

  addResource(){
    this.isAddResourceProcess = true;    
    this.api.post('/addResource.php', this.addResourceForm.value).subscribe(resp => {
      this.isAddResourceProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Add Resource',
          text: 'Resource Added Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }

  editResource(){
    this.showResourcePreview = false;
  }

  loadImages(){
    let params = new HttpParams();
    params = new HttpParams().set("mainCatg","Yes").set("category",this.addResourceForm.value.catg);
    this.api.get('/getImageByCategory.php', params).subscribe(resp => {
      this.imgArr = resp;
    });
    let catg_params = new HttpParams();
    catg_params = new HttpParams().set("id",this.addResourceForm.value.catg);
    this.api.get('/getSubCategoryByCatg.php', catg_params).subscribe(resp => {
      this.subCatgArr = resp;
    });
  }
  showImages(){
    this.showHideImages = true;
    this.selectedImgShow = false;
  }
  selectImage(img){
    this.showHideImages = false;
    this.selectedImgName = img;
    this.addResourceForm.get('img').setValue(img);
    this.showImgErr = false;
    this.selectedImgShow = true;
  }
}


