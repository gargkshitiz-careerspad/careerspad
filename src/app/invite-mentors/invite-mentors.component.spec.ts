import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMentorsComponent } from './invite-mentors.component';

describe('InviteMentorsComponent', () => {
  let component: InviteMentorsComponent;
  let fixture: ComponentFixture<InviteMentorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteMentorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
