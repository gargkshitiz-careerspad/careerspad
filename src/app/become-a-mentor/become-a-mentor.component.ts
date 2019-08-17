import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormArray } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-become-a-mentor',
  templateUrl: './become-a-mentor.component.html',
  styleUrls: ['./become-a-mentor.component.scss']
})
export class BecomeAMentorComponent implements OnInit {
  isPageLoading = true;
  specArr = [];
  submitted = false;
  signUpForm: FormGroup;
  isSignUpProcess = false;
  showOtpForm = false;
  otpForm: FormGroup;
  isOtpConfirmProcess = false;
  otpSubmitted = false;
  apiError = false;
  counter: Observable<number>;
  count = 30;
  showResendOtp = false;
  
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSpeciality();
  }
  loadSpeciality(){
    let params = new HttpParams();
    this.api.get('/getSpeciality.php', params).subscribe(resp => {
      this.isPageLoading = false;
      this.specArr = resp;
      this.initSignUpForm();
    });
  }
  
  get f() { return this.signUpForm.controls; }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      contact: ['', Validators.required],
      services: this.formBuilder.array(this.specArr.map(a=>false),[minSelectedCheckboxes(1),maxSelectedCheckboxes(3)]),
      agree: [false, Validators.required],
      role: ['2'],
      otp: ['']
    });
  }
  onSubmit(){    ;
    this.submitted = true; 
    this.apiError = false;
    if (this.signUpForm.invalid || this.signUpForm.get('agree').value==false) {    
      return;
    }
    this.isSignUpProcess = true;
    this.api.post('/register.php', this.signUpForm.value).subscribe(resp => {
      this.isSignUpProcess = false;
      if (resp.success) {
        this.showOtpForm = true;
        this.initOtpForm();
        this.startCountdown(30);
      }
      else{
        this.apiError = true;
      }
    });
  }

  get otpf() { return this.otpForm.controls; }

  initOtpForm() {
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  onOtpFormSubmit(){
    this.otpSubmitted = true;
    this.apiError = false;
    if (this.otpForm.invalid) {
      return;
    }
    this.signUpForm.get('otp').setValue(this.otpForm.get('otp').value);
    const selectedId = this.signUpForm.value.services.map((v, i) => v ? this.specArr[i].id : null).filter(v => v !== null);
    this.signUpForm.value.services = selectedId;    
    this.isOtpConfirmProcess = true;
    this.api.post('/registerOtpValidate.php', this.signUpForm.value).subscribe(resp => {
      this.isOtpConfirmProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Confirm',
          text: 'OTP confirmed Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.showOtpForm = false;
          this.router.navigate(['/mentor-application-request']);
        });
      }
      else{
        this.apiError = true;
      }
    });
  }

  startCountdown(seconds){
    var counter = seconds;  
    var interval = setInterval(() => {
      //console.log(counter);
      counter--;
      this.count = counter;
  
      if(counter == 0 ){        
        clearInterval(interval);
        this.showResendOtp = true;
      };
    }, 1000);
  }
  resendOtp(){
    this.api.post('/register.php', this.signUpForm.value).subscribe(resp => {
      if (resp.success) {
        this.showResendOtp = false;
        this.startCountdown(30);
      }
    });
  }
}

function minSelectedCheckboxes(min) { 
   
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);
    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

function maxSelectedCheckboxes(max) {  
  
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);
    // if the total is not greater than the minimum, return the error message
    return totalSelected <= max ? null : { maxSelect: true };
  };

  return validator;
}

