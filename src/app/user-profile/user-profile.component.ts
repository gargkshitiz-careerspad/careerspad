import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  wrapperHeight = 500;
  userobj = {};
  isPageLoading = true;
  profileObj = {};
  fname = '';
  lname = '';
  headline = '';
  lpUrl = '';
  about = '';
  showAboutEditForm = false;    
  aboutYourselfForm: FormGroup;
  aboutFormSubmitted = false;
  isUpdateAboutProcess = false;
  closeResult: string;
  updateProfileForm: FormGroup;
  updateProfileSubmitted = false;
  isUpdateProfileProcess = false;  
  addExperienceForm: FormGroup;
  addExperienceSubmitted = false;
  isAddExperienceProcess = false;
  showWorkToOpt = false;
  addEducationForm: FormGroup;
  addEducationSubmitted = false;
  isAddEducationProcess = false;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.loadProfile();    
  }
  loadProfile(){
    let params = new HttpParams();
    this.api.get('/getProfile.php', params).subscribe(resp => {
      if(resp.success){
        this.isPageLoading = false;
        this.profileObj = resp.profile;
        this.fname = resp.profile.fname;
        this.lname = resp.profile.lname;
        this.headline = resp.profile.headline;
        this.lpUrl = resp.profile.lpUrl;
        this.about = resp.profile.about;
        this.initAboutYourselfForm();
        this.initUpdateProfileForm();
        this.initAddExperienceForm();
        this.initAddEducationForm();
      }      
    });
  }
  get abf() { return this.aboutYourselfForm.controls; }
  initAboutYourselfForm() {
    this.aboutYourselfForm = this.formBuilder.group({
      description: [this.about, Validators.required]
    });
  }

  aboutFormSubmit() {
    this.aboutFormSubmitted = true;
    if (this.aboutYourselfForm.invalid) {
      return;
    }
    this.isUpdateAboutProcess = true;
    this.api.post('/updateProfileAbout.php', this.aboutYourselfForm.value).subscribe(resp => {
      this.isUpdateAboutProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Updated',
          text: 'About Yourself Updated Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.showAboutEditForm = false;
          this.loadProfile();
        });
      }
    });
  }

  showAboutEdit(){
    this.showAboutEditForm = true;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openProfilePicPopup(changeProfilePicPopup) {
    this.modalService.open(changeProfilePicPopup, { size: 'lg' });
  }

  get upf() { return this.updateProfileForm.controls; }
  initUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      fname: [this.fname, Validators.required],
      lname: [this.lname, Validators.required],
      headline: [this.headline, Validators.required],
      lpUrl: [this.lpUrl, Validators.required],
      
    });
  }

  updateProfileSubmit() {
    this.updateProfileSubmitted = true;
    if (this.updateProfileForm.invalid) {
      return;
    }   
    this.isUpdateProfileProcess = true;
    this.api.post('/updateProfile.php', this.updateProfileForm.value).subscribe(resp => {
      this.isUpdateAboutProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Updated',
          text: 'Profile Updated Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.isUpdateProfileProcess = false;
          this.loadProfile();
          this.modalService.dismissAll();
        });
      }
    });
  }

  openAddExpPop(experience) {
    this.modalService.open(experience, { size: 'lg' });
  }

  get aexf() { return this.addExperienceForm.controls; }
  initAddExperienceForm() {
    this.addExperienceForm = this.formBuilder.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      fromMonth: ['', Validators.required],
      fromYear: ['', Validators.required],
      toMonth: [''],
      toYear: [''],
      workOption: [true]
    });
    this.addExperienceForm.get('workOption').valueChanges.subscribe(checked => {
      if (checked===true) {
        this.showWorkToOpt = false;
        this.addExperienceForm.get('toMonth').setValidators(null);
        this.addExperienceForm.get('toYear').setValidators(null);        
      } else {
        this.showWorkToOpt = true;
        this.addExperienceForm.get('toMonth').setValidators([Validators.required]);
        this.addExperienceForm.get('toYear').setValidators([Validators.required]);        
      }
      this.addExperienceForm.get('toMonth').updateValueAndValidity();
      this.addExperienceForm.get('toYear').updateValueAndValidity();
    });
  }

  addExperienceSubmit(){
    this.addExperienceSubmitted = true;
    if (this.addExperienceForm.invalid) {
      return;
    }
    this.isAddExperienceProcess = true;
    this.api.post('/addUserExperience.php', this.addExperienceForm.value).subscribe(resp => {
      this.isAddExperienceProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Added',
          text: 'Experience Added Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.showWorkToOpt = false;
          this.loadProfile();
          this.modalService.dismissAll();
        });
      }
    });
  }

  deleteExperience(id){
    this.api.post('/deleteUserExperience.php', {id}).subscribe(resp => {
      if (resp.success) {
        Swal.fire({
          title: 'Deleted',
          text: 'Experience Deleted Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadProfile();
        });
      }
    });
  }

  openAddEduPop(education) {
    this.modalService.open(education, { size: 'lg' });
  }

  get aedf() { return this.addEducationForm.controls; }
  initAddEducationForm() {
    this.addEducationForm = this.formBuilder.group({
      college: ['', Validators.required],
      degree: ['', Validators.required],
      grade: ['', Validators.required],
      location: ['', Validators.required],
      fromYear: ['', Validators.required],
      toYear: ['', Validators.required]
    });
  }

  addEducationSubmit(){
    this.addEducationSubmitted = true;
    if (this.addEducationForm.invalid) {
      return;
    }
    this.isAddEducationProcess = true;
    this.api.post('/addUserEducation.php', this.addEducationForm.value).subscribe(resp => {
      this.isAddEducationProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Added',
          text: 'Education Added Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadProfile();
          this.modalService.dismissAll();
        });
      }
    });
  }

  deleteEducation(id){
    this.api.post('/deleteUserEducation.php', {id}).subscribe(resp => {
      if (resp.success) {
        Swal.fire({
          title: 'Deleted',
          text: 'Education Deleted Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadProfile();
        });
      }
    });
  }

}
