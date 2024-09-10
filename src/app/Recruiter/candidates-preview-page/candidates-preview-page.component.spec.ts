import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesPreviewPageComponent } from './candidates-preview-page.component';

describe('CandidatesPreviewPageComponent', () => {
  let component: CandidatesPreviewPageComponent;
  let fixture: ComponentFixture<CandidatesPreviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatesPreviewPageComponent]
    });
    fixture = TestBed.createComponent(CandidatesPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
