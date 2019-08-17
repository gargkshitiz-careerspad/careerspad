import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.scss']
})
export class ApprovalRequestComponent implements OnInit {
  wrapperHeight = 500;
  reqResArr: any = [];
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.loadRequestedResources(6);
  }

  loadRequestedResources(count) {
    let params = new HttpParams();
    params = new HttpParams().set("status", "0").set("count", count).set("approval", "1");
    this.api.get('/getResources.php', params).subscribe(resp => {
      this.reqResArr = resp;
    });
  }
  loadMoreRequestedResources(c) {
    var count = parseInt(c) + 6;
    this.loadRequestedResources(count);
  }

}
