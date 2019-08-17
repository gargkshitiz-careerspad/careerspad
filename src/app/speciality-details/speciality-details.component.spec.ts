import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityDetailsComponent } from './speciality-details.component';

describe('SpecialityDetailsComponent', () => {
  let component: SpecialityDetailsComponent;
  let fixture: ComponentFixture<SpecialityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
