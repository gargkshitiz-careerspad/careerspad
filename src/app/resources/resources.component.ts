import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  isPageLoading = true;
  specArr = [];
  resArr = [];
  catg = "";
  catg_params: HttpParams = new HttpParams();
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.loadResources(6);
      }
    });
  }

  ngOnInit() {
    this.loadSpeciality();
    this.loadResources(6);
  }
  loadSpeciality() {
    this.api.get('/getSpeciality.php', this.catg_params).subscribe(resp => {
      this.specArr = resp;
    });
  }
  loadResources(count) {
    let params = new HttpParams();
    if(this.route.snapshot.params['catg']!=null){
      params = new HttpParams().set("category", this.route.snapshot.params['catg']).set("count", count);
    }
    else{
      params = new HttpParams().set("count", count);
    }
    params.append("count", count);
    this.api.get('/getResources.php', params).subscribe(resp => {
      this.resArr = resp;
      this.isPageLoading = false;
    });
  }

  loadMore(c){
    var count = parseInt(c) + 6;
    this.loadResources(count);
  }
}
