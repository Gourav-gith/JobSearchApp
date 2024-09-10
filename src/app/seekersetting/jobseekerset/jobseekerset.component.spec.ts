import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekersetComponent } from './jobseekerset.component';

describe('JobseekersetComponent', () => {
  let component: JobseekersetComponent;
  let fixture: ComponentFixture<JobseekersetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekersetComponent]
    });
    fixture = TestBed.createComponent(JobseekersetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
