import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSidemenuComponent } from './recruiter-sidemenu.component';

describe('RecruiterSidemenuComponent', () => {
  let component: RecruiterSidemenuComponent;
  let fixture: ComponentFixture<RecruiterSidemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterSidemenuComponent]
    });
    fixture = TestBed.createComponent(RecruiterSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
