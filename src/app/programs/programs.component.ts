import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  isPageLoading = true;
  isLoadingMore = false;
  specArr = [];
  progArr = [];
  catg = "";
  cparams: HttpParams = new HttpParams();
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.loadPrograms(6);
      }
    });
  }

  ngOnInit() {
    this.loadSpeciality();
    this.loadPrograms(6);
  }

  loadSpeciality(){
    this.api.get('/getProgramCatg.php', this.cparams).subscribe(resp => {
      this.specArr = resp;
    });
  }
  loadPrograms(count){
    let params = new HttpParams();
    if(this.route.snapshot.params['catg']!=null){
      params = new HttpParams().set("category", this.route.snapshot.params['catg']).set("count", count);
    }
    else{
      params = new HttpParams().set("count", count);
    }
    this.api.get('/getPrograms.php', params).subscribe(resp => {
      this.progArr = resp;
      this.isPageLoading = false;
      this.isLoadingMore = false;
    });
  }
  loadMore(c){
    this.isLoadingMore = true;
    var count = parseInt(c) + 6;
    this.loadPrograms(count);
  }

}
