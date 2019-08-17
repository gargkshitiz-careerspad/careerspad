import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  wrapperHeight = 500;
  constructor() { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
  }

}
