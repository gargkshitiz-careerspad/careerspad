import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  wrapperHeight = 500;
  isChangePasswordProcess = false;
  submitted = false;
  changePasswordForm: FormGroup;
  apiError = false;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.initChangePasswordForm();
  }
  //get formCtrl() { return this.changePasswordForm.controls; }
  get f() { return this.changePasswordForm.controls; }
  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      cnfPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'cnfPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.apiError = false;
    this.isChangePasswordProcess = true;
    this.api.post('/changePassword.php', this.changePasswordForm.value).subscribe(resp => {
      this.isChangePasswordProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Password Change',
          text: 'Password Change Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {          
          this.router.navigate(['/dashboard']);
          //this.changePasswordForm.reset();
        });
      }
      else{
        this.apiError = true;
      }
    });
  }

}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
