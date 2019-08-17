import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService } from '@app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit {
  isPageLoading = true;
  wrapperHeight = 500;
  mentorObj: any = {};
  programArr = [];
  resourceArr = [];
  userobj = {};
  showRequestBtn = true;
  isRequestProcess = false;
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
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    if (this.userobj && this.userobj['role'] == 2) {
      this.showRequestBtn = false;
    }
    this.wrapperHeight = window.innerHeight - 195;
    this.loadSingleMentor();
    this.loadPrograms();
    this.loadResources();
  }

  loadSingleMentor() {
    let params = new HttpParams().set("mentor_url", this.route.snapshot.params['url']);
    this.api.get('/getSingleMentor.php', params).subscribe(resp => {
      this.mentorObj = resp;     
      this.isPageLoading = false; 
    });
  }

  loadPrograms() {
    let params = new HttpParams().set("mentor_url", this.route.snapshot.params['url']);
    this.api.get('/getPrograms.php', params).subscribe(resp => {
      this.programArr = resp;
    });
  }

  loadResources() {
    let params = new HttpParams().set("mentor_url", this.route.snapshot.params['url']);
    this.api.get('/getResources.php', params).subscribe(resp => {
      this.resourceArr = resp;
      
    });
  }
  requestMentoring() {
    if (this.userobj && this.userobj['role'] == 1) {
      this.isRequestProcess = true;
      this.api.post('/requestMentoring.php',{mentor_url: this.route.snapshot.params['url']}).subscribe(resp => {
        this.isRequestProcess = false;
        if (resp.success) {
          Swal.fire({
            title: 'Request Mentoring',
            text: 'Mentoring request sent successfully',
            type: 'success',
            confirmButtonText: 'Done',
          }).then((resp) => {
            this.router.navigate(['/dashboard']);
          });
        }
      });
    }
    else {
      this.router.navigate(['/login'], { queryParams: { mentor: this.route.snapshot.params['url'] } });
    }
  }

}
