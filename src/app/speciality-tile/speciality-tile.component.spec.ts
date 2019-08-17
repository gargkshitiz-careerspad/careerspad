import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityTileComponent } from './speciality-tile.component';

describe('SpecialityTileComponent', () => {
  let component: SpecialityTileComponent;
  let fixture: ComponentFixture<SpecialityTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
