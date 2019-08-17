import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAMentorComponent } from './become-a-mentor.component';

describe('BecomeAMentorComponent', () => {
  let component: BecomeAMentorComponent;
  let fixture: ComponentFixture<BecomeAMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
