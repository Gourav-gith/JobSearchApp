import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerbodyComponent } from './seekerbody.component';

describe('SeekerbodyComponent', () => {
  let component: SeekerbodyComponent;
  let fixture: ComponentFixture<SeekerbodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerbodyComponent]
    });
    fixture = TestBed.createComponent(SeekerbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
