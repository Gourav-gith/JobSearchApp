import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualJobComponent } from './individual-job.component';

describe('IndividualJobComponent', () => {
  let component: IndividualJobComponent;
  let fixture: ComponentFixture<IndividualJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualJobComponent]
    });
    fixture = TestBed.createComponent(IndividualJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
