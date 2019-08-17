import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorTileComponent } from './mentor-tile.component';

describe('MentorTileComponent', () => {
  let component: MentorTileComponent;
  let fixture: ComponentFixture<MentorTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
