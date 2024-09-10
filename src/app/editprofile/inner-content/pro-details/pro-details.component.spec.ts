import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDetailsComponent } from './pro-details.component';

describe('ProDetailsComponent', () => {
  let component: ProDetailsComponent;
  let fixture: ComponentFixture<ProDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProDetailsComponent]
    });
    fixture = TestBed.createComponent(ProDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
