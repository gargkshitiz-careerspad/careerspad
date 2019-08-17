import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor-application-request',
  templateUrl: './mentor-application-request.component.html',
  styleUrls: ['./mentor-application-request.component.scss']
})
export class MentorApplicationRequestComponent implements OnInit {
  wrapperHeight = 500;
  constructor() { }
  ngOnInit() {
    this.wrapperHeight = window.innerHeight - 195;
  }

}
