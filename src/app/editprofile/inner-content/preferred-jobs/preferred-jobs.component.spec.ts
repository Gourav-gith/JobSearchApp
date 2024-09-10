import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredJobsComponent } from './preferred-jobs.component';

describe('PreferredJobsComponent', () => {
  let component: PreferredJobsComponent;
  let fixture: ComponentFixture<PreferredJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferredJobsComponent]
    });
    fixture = TestBed.createComponent(PreferredJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
