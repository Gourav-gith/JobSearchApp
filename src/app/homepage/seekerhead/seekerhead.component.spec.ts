import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerheadComponent } from './seekerhead.component';

describe('SeekerheadComponent', () => {
  let component: SeekerheadComponent;
  let fixture: ComponentFixture<SeekerheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerheadComponent]
    });
    fixture = TestBed.createComponent(SeekerheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
