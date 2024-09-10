import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerRegisterComponent } from './seeker-register.component';

describe('SeekerRegisterComponent', () => {
  let component: SeekerRegisterComponent;
  let fixture: ComponentFixture<SeekerRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerRegisterComponent]
    });
    fixture = TestBed.createComponent(SeekerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
