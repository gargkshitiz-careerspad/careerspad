import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorApplicationRequestComponent } from './mentor-application-request.component';

describe('MentorApplicationRequestComponent', () => {
  let component: MentorApplicationRequestComponent;
  let fixture: ComponentFixture<MentorApplicationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorApplicationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorApplicationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
