import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/services/authentication.service';
import { ApiService } from '@app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  wrapperHeight = 500;
  returnUrl: string;
  showApiError = false;
  apiMessage: string;
  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private api: ApiService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.authenticationService.logout();
  }

  get formCtrl() { return this.loginForm.controls; }

  signIn() {
    this.showApiError = false;
    this.api.post('/login.php', this.loginForm.value).subscribe(resp => {
      if (resp.success) {
        this.authenticationService.login({
          token: resp.token,
          role: resp.role,
          name: resp.name,
          pic: resp.pic
        });
        if (this.route.snapshot.queryParams['mentor'] && this.route.snapshot.queryParams['mentor'] != null) {
          this.router.navigate(['/mentors', 'profile', this.route.snapshot.queryParams['mentor']]);
        }
        else if (this.route.snapshot.queryParams['id'] && this.route.snapshot.queryParams['id'] != null && this.route.snapshot.queryParams['question'] != null) {
          this.api.post('/askQuestion.php', { catg: this.route.snapshot.queryParams['id'], question: this.route.snapshot.queryParams['question'] }).subscribe(resp => {
            if (resp.success) {
              Swal.fire({
                title: 'Ask Question',
                text: 'Question Submitted Successfully',
                type: 'success',
                confirmButtonText: 'Done',
              }).then((rsp) => {
                this.router.navigate(['/get-career-advice']);
              });
            }
          });
        }
        else if (this.route.snapshot.queryParams['program'] && this.route.snapshot.queryParams['catg'] && this.route.snapshot.queryParams['bookDate']) {
          this.api.post('/programBooking.php',{program_url: this.route.snapshot.queryParams['program'], bookDate: this.route.snapshot.queryParams['bookDate']}).subscribe(resp => {
            if (resp.success) {
              Swal.fire({
                title: 'Program Booking',
                text: 'Program Booked successfully',
                type: 'success',
                confirmButtonText: 'Done',
              }).then((resp) => {
                this.router.navigate(['/dashboard']);
              });
            }
            else{
              this.router.navigate(['/programs', this.route.snapshot.queryParams['catg'], this.route.snapshot.queryParams['program']]);
              //this.apiMessage = resp.message;
            }
          });
        }
        else if (this.route.snapshot.queryParams['program'] && this.route.snapshot.queryParams['catg']) {
          this.api.post('/programBooking.php',{program_url: this.route.snapshot.queryParams['program']}).subscribe(resp => {
            if (resp.success) {
              Swal.fire({
                title: 'Program Booking',
                text: 'Program Booked successfully',
                type: 'success',
                confirmButtonText: 'Done',
              }).then((rsp) => {
                this.router.navigate(['/dashboard']);
              });
            }
            else{
              this.router.navigate(['/programs', this.route.snapshot.queryParams['catg'], this.route.snapshot.queryParams['program']]);
            }
          });
        }        
        else {
          this.router.navigate([this.returnUrl]);
        }
      }
      else {
        this.showApiError = true;
      }

    });

  }
}
