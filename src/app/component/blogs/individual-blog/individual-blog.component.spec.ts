import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualBlogComponent } from './individual-blog.component';

describe('IndividualBlogComponent', () => {
  let component: IndividualBlogComponent;
  let fixture: ComponentFixture<IndividualBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualBlogComponent]
    });
    fixture = TestBed.createComponent(IndividualBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
