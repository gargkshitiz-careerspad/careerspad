import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '@app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-career-advice-tile',
  templateUrl: './career-advice-tile.component.html',
  styleUrls: ['./career-advice-tile.component.scss']
})
export class CareerAdviceTileComponent implements OnInit {
  qaArr = [];
  userobj = {};
  showAnswerBtn = false;
  submitted = false;
  qid = 0;
  answerForm: FormGroup;
  isAnswerSubmitProcess = false;
  
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    if (this.userobj && this.userobj['role'] == 2) {
      this.showAnswerBtn = true;
    }
    this.loadQA();
  }
  loadQA() {
    let params = new HttpParams();
    this.api.get('/getAskQuestions.php', params).subscribe(resp => {
      this.qaArr = resp.data;
      this.initAnswerForm();
    });
  }

  showAnswerForm(id){
    this.qid = id;
    this.answerForm.get('qid').setValue(id);
  }

  initAnswerForm() {
    this.answerForm = this.formBuilder.group({
      answer: ['', Validators.required],
      qid: [0, Validators.required]
    });
  }
  onSubmit(){
    debugger;
    this.submitted = true;    
    if (this.answerForm.invalid) {
      return;
    }
    
    this.isAnswerSubmitProcess = true;    
      this.api.post('/answerSubmit.php', this.answerForm.value).subscribe(resp => {
        this.isAnswerSubmitProcess = false;
        if (resp.success) {
          Swal.fire({
            title: 'Answer',
            text: 'Answer Submitted Successfully',
            type: 'success',
            confirmButtonText: 'Done',
          }).then((resp) => {
            this.qid = 0;
            this.loadQA();
          });
        }
      });
    
  }
}
