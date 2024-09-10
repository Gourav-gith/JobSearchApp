import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobStep1Component } from './post-job-step1.component';

describe('PostJobStep1Component', () => {
  let component: PostJobStep1Component;
  let fixture: ComponentFixture<PostJobStep1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostJobStep1Component]
    });
    fixture = TestBed.createComponent(PostJobStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
