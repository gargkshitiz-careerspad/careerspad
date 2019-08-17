import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent implements OnInit {
  isPageLoading = true;
  isLoadingMore = false;
  specArr = [];
  mentorArr =[];
  cparams: HttpParams = new HttpParams();
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.loadMentors(6);
      }
    });
   }

  ngOnInit() {
    this.loadSpeciality();
    this.loadMentors(6);
  }
  loadSpeciality(){
    this.api.get('/getSpeciality.php', this.cparams).subscribe(resp => {
      this.specArr = resp;
    });
  }
  loadMentors(count){
    let params = new HttpParams();
    if(this.route.snapshot.params['catg']!=null){
      params = new HttpParams().set("category", this.route.snapshot.params['catg']).set("count", count);
    }
    else{
      params = new HttpParams().set("count", count);
    }
    this.api.get('/getMentors.php', params).subscribe(resp => {
      this.mentorArr = resp;
      this.isPageLoading = false;
      this.isLoadingMore = false;
    });
  }
  loadMore(c){
    this.isLoadingMore = true;
    var count = parseInt(c) + 6;
    this.loadMentors(count);
  }
}
