import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBookingListComponent } from './program-booking-list.component';

describe('ProgramBookingListComponent', () => {
  let component: ProgramBookingListComponent;
  let fixture: ComponentFixture<ProgramBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
