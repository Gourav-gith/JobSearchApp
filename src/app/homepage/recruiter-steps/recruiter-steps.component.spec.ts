import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterStepsComponent } from './recruiter-steps.component';

describe('RecruiterStepsComponent', () => {
  let component: RecruiterStepsComponent;
  let fixture: ComponentFixture<RecruiterStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterStepsComponent]
    });
    fixture = TestBed.createComponent(RecruiterStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
