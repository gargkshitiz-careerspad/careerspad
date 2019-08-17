import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  wrapperHeight = 500;
  userobj: any = {};
  isMentee = false;
  reqResArr: any = [];
  appResArr: any = [];
  reqProgArr: any = [];
  appProgArr: any = [];
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    if (this.userobj && this.userobj['role'] == 1) {
      this.isMentee = true;
    }
    this.loadRequestedResources(6);
    this.loadApprovedResources(6);
    this.loadRequestPrograms(6);
    this.loadApprovedPrograms(6);
  }
  loadRequestedResources(count) {
    let params = new HttpParams();
    params = new HttpParams().set("type", "mentor").set("status", "0").set("count", count);
    this.api.get('/getResources.php', params).subscribe(resp => {
      this.reqResArr = resp;
    });
  }
  loadMoreRequestedResources(c) {
    var count = parseInt(c) + 6;
    this.loadRequestedResources(count);
  }
  loadApprovedResources(count) {
    let params = new HttpParams();
    params = new HttpParams().set("type", "mentor").set("status", "1").set("count", count);
    this.api.get('/getResources.php', params).subscribe(resp => {
      this.appResArr = resp;
    });
  }
  loadMoreApprovedResources(c) {
    var count = parseInt(c) + 6;
    this.loadApprovedResources(count);
  }
  loadRequestPrograms(count) {
    let params = new HttpParams();
    params = new HttpParams().set("type", "dashboard").set("status", "0").set("count", count);
    this.api.get('/getPrograms.php', params).subscribe(resp => {
      this.reqProgArr = resp;
    });
  }
  loadMoreRequestPrograms(c) {
    var count = parseInt(c) + 6;
    this.loadRequestPrograms(count);
  }
  loadApprovedPrograms(count) {
    let params = new HttpParams();
    params = new HttpParams().set("type", "dashboard").set("status", "1").set("count", count);
    this.api.get('/getPrograms.php', params).subscribe(resp => {
      this.appProgArr = resp;
    });
  }
  loadMoreApprovedPrograms(c) {
    var count = parseInt(c) + 6;
    this.loadApprovedPrograms(count);
  }


}
