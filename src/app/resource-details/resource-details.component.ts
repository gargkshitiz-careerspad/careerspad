import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent implements OnInit {
  resObj: any = {};
  catg_url = "";
  url = "";
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.loadSingleResource();
      }
  });
  }

  ngOnInit() {
    this.loadSingleResource();
  }
  loadSingleResource(){    
    this.catg_url = this.route.snapshot.params['catg'];
    this.url = this.route.snapshot.params['url'];
    let catg_params = new HttpParams().set("catg_url", this.catg_url).set("resource_url", this.url);
    this.api.get('/getSingleResource.php', catg_params).subscribe(resp => {
      this.resObj = resp;
    });    
  }
}
