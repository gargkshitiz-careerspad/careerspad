import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {
  wrapperHeight = 500;
  isChangePasswordProcess = false;
  submitted = false;
  changePasswordForm: FormGroup;
  apiError = false;
  
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.route.snapshot.queryParams['token'] && this.route.snapshot.queryParams['mentor']!=null){
      this.router.navigate([ './']);
    }
    this.wrapperHeight = window.innerHeight - 195;
    this.initChangePasswordForm();
  }

  get f() { return this.changePasswordForm.controls; }
  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      cnfPassword: ['', Validators.required],
      token: [this.route.snapshot.queryParams['token'], Validators.required]
    }, {
      validator: MustMatch('password', 'cnfPassword')
    });
  }

  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.apiError = false;
    this.isChangePasswordProcess = true;
    this.api.post('/setNewPassword.php', this.changePasswordForm.value).subscribe(resp => {
      this.isChangePasswordProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Password Change',
          text: 'Password Change Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {          
          this.router.navigate(['/login']);
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
