import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sliderHeight = 200;
  sliderArr = [];
  specArr = [];
  programArr: any = [];
  resArr: any = [];
  mentorArr: any = [];
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
        items: 3
      }
    },
    nav: true
  }

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.sliderHeight = window.innerHeight - 74;
    this.loadBanners();
    this.loadSpeciality();
    this.loadPrograms();
    this.loadResources();
    this.loadMentors();
  }

  loadBanners(){
    let params = new HttpParams();
    this.api.get('/getBanners.php', params).subscribe(resp => {
      this.sliderArr = resp;
    });
  }
  loadSpeciality(){
    let params = new HttpParams();
    this.api.get('/getSpeciality.php', params).subscribe(resp => {
      this.specArr = resp;
    });
  }
  loadPrograms(){
    let params = new HttpParams();
    params = new HttpParams().set("showHome", "1");
    this.api.get('/getPrograms.php', params).subscribe(resp => {
      this.programArr = resp;
    });
  }
  loadResources(){
    let params = new HttpParams();
    params = new HttpParams().set("showHome", "1");
    this.api.get('/getResources.php', params).subscribe(resp => {
      this.resArr = resp;
    });
  }
  loadMentors(){
    let params = new HttpParams();
    params = new HttpParams().set("showHome", "1");
    this.api.get('/getMentors.php', params).subscribe(resp => {
      this.mentorArr = resp;
    });
  }
}
