import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invite-mentors',
  templateUrl: './invite-mentors.component.html',
  styleUrls: ['./invite-mentors.component.scss']
})
export class InviteMentorsComponent implements OnInit {
  wrapperHeight = 500;
  isPageLoading = true;
  inviteArr = [];
  submitted = false;
  inviteMentorForm: FormGroup;
  showEmailField = true;
  isInviteProcess = false;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.loadSentInvitation();
    this.initInviteMentorForm();
  }
  loadSentInvitation(){
    let params = new HttpParams();
    this.api.get('/sentInvitation.php', params).subscribe(resp => {
      if(resp.success){
        if(resp.data.length>0){
          this.isPageLoading = false;
          this.inviteArr = resp.data;
        }
      }      
    });
  }
  get f() { return this.inviteMentorForm.controls; }
  initInviteMentorForm() {
    this.inviteMentorForm = this.formBuilder.group({
      name: ['', Validators.required],
      inviteBy: ['Email'],
      email: ['', Validators.required],
      countryCode: [''],
      contact: [''],
      message: [''],
    });
    this.inviteMentorForm.get('inviteBy').valueChanges.subscribe(checked => {      
      if (checked=='Email') {
        this.showEmailField = true;
        this.inviteMentorForm.get('email').setValidators([Validators.required]);
        this.inviteMentorForm.get('countryCode').setValidators(null);
        this.inviteMentorForm.get('contact').setValidators(null);
      } else {
        this.showEmailField = false;
        this.inviteMentorForm.get('email').setValidators(null);
        this.inviteMentorForm.get('countryCode').setValidators([Validators.required]);
        this.inviteMentorForm.get('contact').setValidators([Validators.required]);
      }
      this.inviteMentorForm.get('email').updateValueAndValidity();
      this.inviteMentorForm.get('countryCode').updateValueAndValidity();
      this.inviteMentorForm.get('contact').updateValueAndValidity();
    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.inviteMentorForm.invalid) {
      return;
    }
    this.isInviteProcess = true;    
    this.api.post('/inviteMentor.php', this.inviteMentorForm.value).subscribe(resp => {
      this.isInviteProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Invite Mentor',
          text: 'Invitation sent successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          this.loadSentInvitation();
          this.showEmailField = true;
        });
      }
    });
  }
}
