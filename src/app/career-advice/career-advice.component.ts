import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career-advice',
  templateUrl: './career-advice.component.html',
  styleUrls: ['./career-advice.component.scss']
})
export class CareerAdviceComponent implements OnInit {
  wrapperHeight = 500;

  constructor() { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
  }

}
