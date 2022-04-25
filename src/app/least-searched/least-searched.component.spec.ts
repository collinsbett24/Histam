import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeastSearchedComponent } from './least-searched.component';

describe('LeastSearchedComponent', () => {
  let component: LeastSearchedComponent;
  let fixture: ComponentFixture<LeastSearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeastSearchedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeastSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
