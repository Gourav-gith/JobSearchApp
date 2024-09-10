import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerStepsComponent } from './seeker-steps.component';

describe('SeekerStepsComponent', () => {
  let component: SeekerStepsComponent;
  let fixture: ComponentFixture<SeekerStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerStepsComponent]
    });
    fixture = TestBed.createComponent(SeekerStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
