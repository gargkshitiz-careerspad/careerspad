import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCareerAdviceComponent } from './get-career-advice.component';

describe('GetCareerAdviceComponent', () => {
  let component: GetCareerAdviceComponent;
  let fixture: ComponentFixture<GetCareerAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCareerAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCareerAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
