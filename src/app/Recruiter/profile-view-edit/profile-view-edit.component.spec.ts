import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewEditComponent } from './profile-view-edit.component';

describe('ProfileViewEditComponent', () => {
  let component: ProfileViewEditComponent;
  let fixture: ComponentFixture<ProfileViewEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileViewEditComponent]
    });
    fixture = TestBed.createComponent(ProfileViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
