import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoringRequestComponent } from './mentoring-request.component';

describe('MentoringRequestComponent', () => {
  let component: MentoringRequestComponent;
  let fixture: ComponentFixture<MentoringRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentoringRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentoringRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
