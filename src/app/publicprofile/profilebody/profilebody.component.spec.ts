import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebodyComponent } from './profilebody.component';

describe('ProfilebodyComponent', () => {
  let component: ProfilebodyComponent;
  let fixture: ComponentFixture<ProfilebodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilebodyComponent]
    });
    fixture = TestBed.createComponent(ProfilebodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
