import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTileComponent } from './program-tile.component';

describe('ProgramTileComponent', () => {
  let component: ProgramTileComponent;
  let fixture: ComponentFixture<ProgramTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
