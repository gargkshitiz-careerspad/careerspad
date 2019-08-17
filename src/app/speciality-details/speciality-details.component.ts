import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-speciality-details',
  templateUrl: './speciality-details.component.html',
  styleUrls: ['./speciality-details.component.scss']
})
export class SpecialityDetailsComponent implements OnInit {
  isPageLoading = true;
  specObj: any = {};
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadSpecialityDetails();
  }

  loadSpecialityDetails(){
    let catg_params = new HttpParams().set("spec_url", this.route.snapshot.params['catg']).set("spec_catg_url",this.route.snapshot.params['sub_catg']);
    this.api.get('/getSingleSpecialityDetails.php', catg_params).subscribe(resp => {
      this.specObj = resp;
      this.isPageLoading = false;
    });    
}

}
