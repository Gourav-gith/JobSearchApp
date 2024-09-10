import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalDetailsModelComponent } from './professional-details-model.component';

describe('ProfessionalDetailsModelComponent', () => {
  let component: ProfessionalDetailsModelComponent;
  let fixture: ComponentFixture<ProfessionalDetailsModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalDetailsModelComponent]
    });
    fixture = TestBed.createComponent(ProfessionalDetailsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
