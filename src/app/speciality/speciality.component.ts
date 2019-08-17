import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  isPageLoading = true;
  wrapperHeight = 500;
  specObj: any = {};
  catg_url = "";
  
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.loadSingleSpeciality();
      }
  });
  }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
    this.loadSingleSpeciality();
  }

  loadSingleSpeciality(){    
      this.catg_url = this.route.snapshot.params['catg'];
      let catg_params = new HttpParams().set("catg_url", this.catg_url);
      this.api.get('/getSingleSpeciality.php', catg_params).subscribe(resp => {
        this.specObj = resp;
        this.isPageLoading = false;
      });
  }

}
