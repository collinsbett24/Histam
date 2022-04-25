import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SFooterComponent } from './s-footer.component';

describe('SFooterComponent', () => {
  let component: SFooterComponent;
  let fixture: ComponentFixture<SFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
