import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-program-booking-list',
  templateUrl: './program-booking-list.component.html',
  styleUrls: ['./program-booking-list.component.scss']
})
export class ProgramBookingListComponent implements OnInit {
  isPageLoading = true;
  confirmSelected = {};
  pBookingArr = [];
  pname = '';
  submitted = false;
  confirmBookingForm: FormGroup;
  isConfirmProcess = false;
  confirmError = false;
  showAttendCheckBox = '';
  isAttendProcess = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProgramBooking();
  }

  loadProgramBooking() {
    let params = new HttpParams();
    if (this.route.snapshot.params['id'] != null) {
      params = new HttpParams().set("pid", this.route.snapshot.params['id']);
    }
    this.api.get('/getPBookingList.php', params).subscribe(resp => {
      if (resp.success) {        
        this.pBookingArr = resp.data;
        this.pname = resp.pname;
        this.showAttendCheckBox = resp.showAttendCheckBox;
        this.isPageLoading = false;
      }

    });
  }
  
  onSubmit() {
    this.confirmError = false;
    const objCnf = Object.keys(this.confirmSelected).filter(e=>{
      if(this.confirmSelected[e] && this.confirmSelected[e]===true){
        return e;
      }
    });
    if(objCnf.length==0){
      this.confirmError = true;
      return;
    }
    this.isConfirmProcess = true;
    this.api.post('/pBookingConfirm.php', {id: objCnf}).subscribe(resp => {
      this.isConfirmProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Confirm',
          text: 'Booking confirmed Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadProgramBooking();
          this.confirmBookingForm.value.reset();
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }
  attend() {
    this.confirmError = false;
    const objCnf = Object.keys(this.confirmSelected).filter(e=>{
      if(this.confirmSelected[e] && this.confirmSelected[e]===true){
        return e;
      }
    });
    if(objCnf.length==0){
      this.confirmError = true;
      return;
    }
    this.isAttendProcess = true;
    this.api.post('/pBookingAttendance.php', {id: objCnf}).subscribe(resp => {
      this.isAttendProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Confirm',
          text: 'Submitted Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadProgramBooking();
          this.confirmBookingForm.value.reset();
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }
}
