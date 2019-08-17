import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  wrapperHeight = 500;
  constructor() { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195
  }

}
