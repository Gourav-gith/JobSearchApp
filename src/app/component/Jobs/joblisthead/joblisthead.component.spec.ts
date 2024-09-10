import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistheadComponent } from './joblisthead.component';

describe('JoblistheadComponent', () => {
  let component: JoblistheadComponent;
  let fixture: ComponentFixture<JoblistheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoblistheadComponent]
    });
    fixture = TestBed.createComponent(JoblistheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
