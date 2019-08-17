import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {
  wrapperHeight = 500;

  constructor() { }

  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195
  }

}
