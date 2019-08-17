import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-mentees',
  templateUrl: './mentees.component.html',
  styleUrls: ['./mentees.component.scss']
})
export class MenteesComponent implements OnInit {
  wrapperHeight = 500;
  mrArr = [];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.loadMentoringRequest();
  }
  loadMentoringRequest(){
    let params = new HttpParams();
    this.api.get('/getMentoringRequest.php', params).subscribe(resp => {
      this.mrArr = resp;
    });
  }
}
