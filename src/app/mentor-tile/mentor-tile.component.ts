import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mentor-tile',
  templateUrl: './mentor-tile.component.html',
  styleUrls: ['./mentor-tile.component.scss']
})
export class MentorTileComponent implements OnInit {
  @Input() mentor: any = {};
  @Input() style: string;
  constructor() { }

  ngOnInit() {
  }

}
