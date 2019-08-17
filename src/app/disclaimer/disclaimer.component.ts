import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {
  wrapperHeight = 500;
  constructor() { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
  }

}
