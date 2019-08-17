import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '@app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentoring-request',
  templateUrl: './mentoring-request.component.html',
  styleUrls: ['./mentoring-request.component.scss']
})
export class MentoringRequestComponent implements OnInit {
  mrArr: any = [];
  mmArr: any = [];
  userobj: any = {};
  isDeclineRequestProcess = false;
  isAcceptRequestProcess = false;
  isCancelRequestProcess = false;
  isRemoveRequestProcess = false;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.loadMentoringRequest();
    this.loadMentorMentee();
  }

  loadMentoringRequest(){
    let params = new HttpParams();
    this.api.get('/getMentoringRequest.php', params).subscribe(resp => {
      this.mrArr = resp;
    });
  }

  loadMentorMentee(){
    let params = new HttpParams();
    this.api.get('/getMentorMentee.php', params).subscribe(resp => {
      this.mmArr = resp;
    });
  }

  acceptRequest(id){
    this.isAcceptRequestProcess = true;
    this.api.post('/acceptMentoringRequest.php',{id}).subscribe(resp => {
      this.isAcceptRequestProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Request Accept',
          text: 'Mentoring request accepted successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadMentoringRequest();
          this.loadMentorMentee();
        });
      }
    });
  }
  
  declineRequest(id){
    this.isDeclineRequestProcess = true;
    this.api.post('/declineMentoringRequest.php',{id}).subscribe(resp => {
      this.isDeclineRequestProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Request Decline',
          text: 'Mentoring request declined successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadMentoringRequest();
          this.loadMentorMentee();
        });
      }
    });
  }

  cancelRequest(id){
    this.isCancelRequestProcess = true;
    this.api.post('/cancelMentoringRequest.php',{id}).subscribe(resp => {
      this.isCancelRequestProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Request Cancel',
          text: 'Mentoring request cancelled successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadMentoringRequest();
          this.loadMentorMentee();
        });
      }
    });
  }

  removeRequest(id){
    this.isRemoveRequestProcess = true;
    this.api.post('/removeMM.php',{id}).subscribe(resp => {
      this.isRemoveRequestProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Remove',
          text: 'Remove successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadMentoringRequest();
          this.loadMentorMentee();
        });
      }
    });
  }

}
