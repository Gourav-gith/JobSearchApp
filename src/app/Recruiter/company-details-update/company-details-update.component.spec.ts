import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsUpdateComponent } from './company-details-update.component';

describe('CompanyDetailsUpdateComponent', () => {
  let component: CompanyDetailsUpdateComponent;
  let fixture: ComponentFixture<CompanyDetailsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDetailsUpdateComponent]
    });
    fixture = TestBed.createComponent(CompanyDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
