import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService } from '@app/services/authentication.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {
  wrapperHeight = 500;
  isPageLoading = true;
  progObj: any = {};
  userobj: any = {};
  showBookingBtn = true;
  submitted = false;
  programBookingForm: FormGroup;
  isBookingProcess = false;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true
  }
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    
    this.auth.currentUser.subscribe(resp => {
      //debugger;
      this.userobj = resp;
    });
    if (this.userobj && this.userobj['role'] == 2) {
      this.showBookingBtn = false;
    }
    this.loadSingleProgram();
    this.initProgramBookingForm();
  }

  loadSingleProgram(){
    let catg_params = new HttpParams().set("catg_url", this.route.snapshot.params['catg']).set("program_url", this.route.snapshot.params['url']);
    this.api.get('/getSingleProgram.php', catg_params).subscribe(resp => {
      this.progObj = resp;
      this.isPageLoading = false;
    });    
  }

  programBooking() {
    if (this.userobj && this.userobj['role'] == 1) {
      this.isBookingProcess = true;
      this.api.post('/programBooking.php',{program_url: this.route.snapshot.params['url']}).subscribe(resp => {
        this.isBookingProcess = false;
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
      });
    }
    else {
      this.router.navigate(['/login'], { queryParams: { program: this.route.snapshot.params['url'], catg: this.route.snapshot.params['catg'] } });
    }
  }

  get f() { return this.programBookingForm.controls; }

  initProgramBookingForm() {
    this.programBookingForm = this.formBuilder.group({
      bookDate: ['', Validators.required]
    });
  }

  onSubmit(){
    //debugger;
    this.submitted = true;
    //this.apiError = false;
    if (this.programBookingForm.invalid) {
      return;
    }
    if (this.userobj && this.userobj['role'] == 1) {
      this.isBookingProcess = true;
      this.api.post('/programBooking.php',{program_url: this.route.snapshot.params['url'], bookDate: this.programBookingForm.get('bookDate').value}).subscribe(resp => {
        this.isBookingProcess = false;
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
      });
    }
    else {
      this.router.navigate(['/login'], { queryParams: { program: this.route.snapshot.params['url'], catg: this.route.snapshot.params['catg'], bookDate: this.programBookingForm.get('bookDate').value } });
    }
  }

}
