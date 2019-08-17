import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageSideBarComponent } from './user-page-side-bar.component';

describe('UserPageSideBarComponent', () => {
  let component: UserPageSideBarComponent;
  let fixture: ComponentFixture<UserPageSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
