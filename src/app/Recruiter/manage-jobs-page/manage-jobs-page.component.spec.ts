import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobsPageComponent } from './manage-jobs-page.component';

describe('ManageJobsPageComponent', () => {
  let component: ManageJobsPageComponent;
  let fixture: ComponentFixture<ManageJobsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageJobsPageComponent]
    });
    fixture = TestBed.createComponent(ManageJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
