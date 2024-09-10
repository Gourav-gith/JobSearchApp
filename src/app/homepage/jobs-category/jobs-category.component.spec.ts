import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCategoryComponent } from './jobs-category.component';

describe('JobsCategoryComponent', () => {
  let component: JobsCategoryComponent;
  let fixture: ComponentFixture<JobsCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsCategoryComponent]
    });
    fixture = TestBed.createComponent(JobsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
