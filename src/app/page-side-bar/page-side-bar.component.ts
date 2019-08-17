import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-side-bar',
  templateUrl: './page-side-bar.component.html',
  styleUrls: ['./page-side-bar.component.scss']
})
export class PageSideBarComponent implements OnInit {
  @Input() heading: string;
  @Input() list: {};
  @Input() click: string;
  constructor() { }

  ngOnInit() {
  }

}
