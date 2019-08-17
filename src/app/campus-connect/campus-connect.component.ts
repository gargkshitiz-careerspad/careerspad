import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campus-connect',
  templateUrl: './campus-connect.component.html',
  styleUrls: ['./campus-connect.component.scss']
})
export class CampusConnectComponent implements OnInit {
  submitted = false;
  campusConnectForm: FormGroup;
  isCampusConnectProcess = false;
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
    this.initCampusConnectForm();
  }

  get f() { return this.campusConnectForm.controls; }

  initCampusConnectForm() {
    this.campusConnectForm = this.formBuilder.group({
      collegeName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      contact: ['', Validators.required],
      location: ['', Validators.required],
      pincode: ['', Validators.required],
      nature: ['', Validators.required],
      message: ['', Validators.required],
      otp: ['']
    });
  }

  onSubmit() {    
    this.submitted = true;
    this.apiError = false;
    if (this.campusConnectForm.invalid) {
      return;
    }
    this.isCampusConnectProcess = true;
    this.api.post('/campusConnect.php', this.campusConnectForm.value).subscribe(resp => {
      this.isCampusConnectProcess = false;
      if (resp.success) {
        this.showOtpForm = true;
        this.initOtpForm();
        this.startCountdown(30);
      }
      else {
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
  onOtpFormSubmit() {  
    this.otpSubmitted = true;
    this.apiError = false;
    if (this.otpForm.invalid) {
      return;
    }    
    this.campusConnectForm.get('otp').setValue(this.otpForm.get('otp').value);  
    this.isOtpConfirmProcess = true;
    this.api.post('/campusConnectOtpValidate.php', this.campusConnectForm.value).subscribe(resp => {
      this.isOtpConfirmProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Confirm',
          text: 'OTP confirmed Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.showOtpForm = false;
          this.router.navigate(['/thank-you']);
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
    this.api.post('/campusConnect.php', this.campusConnectForm.value).subscribe(resp => {
      if (resp.success) {
        this.showResendOtp = false;
        this.startCountdown(30);
      }
    });
  }

}
