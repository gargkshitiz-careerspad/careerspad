import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAdviceTileComponent } from './career-advice-tile.component';

describe('CareerAdviceTileComponent', () => {
  let component: CareerAdviceTileComponent;
  let fixture: ComponentFixture<CareerAdviceTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerAdviceTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerAdviceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
