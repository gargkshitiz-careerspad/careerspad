import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSideBarComponent } from './page-side-bar.component';

describe('PageSideBarComponent', () => {
  let component: PageSideBarComponent;
  let fixture: ComponentFixture<PageSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
