import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  wrapperHeight = 500;
  showApiError = false;
  showOptions = true;
  showMobileOption = false;
  showEmailOption = false;
  esubmitted = false;
  preForm: FormGroup;
  isPREProcess = false;
  showEmailMsg = false;
  msubmitted = false;
  prmForm: FormGroup;
  isPRMProcess = false;
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
    this.wrapperHeight = window.innerHeight - 195;
  }
  get ef() { return this.preForm.controls; }
  initPREForm() {
    this.preForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  passwordRecoveryEmail() {
    this.esubmitted = true;
    if (this.preForm.invalid) {
      return;
    }
    this.showApiError = false;
    this.isPREProcess = true;
    this.api.post('/forgotPasswordEmail.php', this.preForm.value).subscribe(resp => {
      this.isPREProcess = false;
      if(resp.success){        
        this.showEmailMsg = true; 
        this.showEmailOption = false;
      }
      else{
        this.showApiError = true;
      }      
    });
    
  }
  get mf() { return this.prmForm.controls; }
  initPRMForm() {
    this.prmForm = this.formBuilder.group({
      countryCode: ['', Validators.required],
      contact: ['', Validators.required],
      otp: ['']
    });
  }
  recoveryWithMobile(){
    this.initPRMForm();
    this.showOptions = false;
    this.showMobileOption = true;
    this.showEmailOption = false;
  }

  recoveryWithEmail(){
    this.initPREForm();
    this.showOptions = false;
    this.showMobileOption = false;
    this.showEmailOption = true;
  }
  passwordRecoveryMobile() {
    this.msubmitted = true;
    if (this.prmForm.invalid) {
      return;
    }
    this.showApiError = false;
    this.isPRMProcess = true;
    this.api.post('/forgotPasswordMobile.php', this.prmForm.value).subscribe(resp => {
      this.isPRMProcess = false;
      if(resp.success){        
        this.initOtpForm();        
        this.showOtpForm = true;
        this.startCountdown(30);
      }
      else{
        this.showApiError = true;
      }
      
    });
    
  }

  get otpf() { return this.otpForm.controls; }

  initOtpForm() {
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  onOtpFormSubmit() {  
    this.otpSubmitted = true;
    this.apiError = false;
    if (this.otpForm.invalid) {
      return;
    }    
    this.prmForm.get('otp').setValue(this.otpForm.get('otp').value);
    this.isOtpConfirmProcess = true;
    this.api.post('/forgorPasswordOtpValidate.php', this.prmForm.value).subscribe(resp => {
      this.isOtpConfirmProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Confirm',
          text: 'OTP confirmed Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((rsp) => {
          let token = resp.token;
          this.showOtpForm = false;
          this.router.navigate(['/set-new-password'], { queryParams: { token: token} });
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
    this.api.post('/forgotPasswordMobile.php', this.prmForm.value).subscribe(resp => {
      if (resp.success) {
        this.showResendOtp = false;
        this.startCountdown(30);
      }
    });
  }
}
