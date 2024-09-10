import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbodyComponent } from './editbody.component';

describe('EditbodyComponent', () => {
  let component: EditbodyComponent;
  let fixture: ComponentFixture<EditbodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditbodyComponent]
    });
    fixture = TestBed.createComponent(EditbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
