import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { AuthenticationService } from '@app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-career-advice',
  templateUrl: './get-career-advice.component.html',
  styleUrls: ['./get-career-advice.component.scss']
})
export class GetCareerAdviceComponent implements OnInit {
  isPageLoading = true;
  userobj = {};
  specArr = [];
  showAskBtn = true;
  submitted = false;
  askQuestionForm: FormGroup;
  isAskQuestionProcess = false;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    if (this.userobj && this.userobj['role'] == 2) {
      this.showAskBtn = false;
    }
    this.loadSpeciality();
  }
  loadSpeciality() {
    let params = new HttpParams();
    this.api.get('/getSpeciality.php', params).subscribe(resp => {
      this.isPageLoading = false;
      this.specArr = resp;
      this.initAskQuestionForm();
    });
  }
  get f() { return this.askQuestionForm.controls; }
  initAskQuestionForm() {
    this.askQuestionForm = this.formBuilder.group({
      catg: ['', Validators.required],
      question: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.askQuestionForm.invalid) {
      return;
    }
    if (this.userobj && this.userobj['role'] == 1) {
      this.isAskQuestionProcess = true;
      this.api.post('/askQuestion.php', this.askQuestionForm.value).subscribe(resp => {
        this.isAskQuestionProcess = false;
        if (resp.success) {
          Swal.fire({
            title: 'Ask Question',
            text: 'Question Submitted Successfully',
            type: 'success',
            confirmButtonText: 'Done',
          }).then((resp) => {
            this.router.navigate(['/dashboard']);
          });
        }
      });
    }
    else {
      this.router.navigate(['/login'], { queryParams: { id: this.askQuestionForm.get("catg").value, question: this.askQuestionForm.get("question").value } });
    }

  }

}
