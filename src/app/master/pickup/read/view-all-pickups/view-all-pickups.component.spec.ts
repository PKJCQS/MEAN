import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSchoolsComponent } from './view-all-schools.component';

describe('ViewAllSchoolsComponent', () => {
  let component: ViewAllSchoolsComponent;
  let fixture: ComponentFixture<ViewAllSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
