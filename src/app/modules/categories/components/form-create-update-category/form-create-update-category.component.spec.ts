import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateUpdateCategoryComponent } from './form-create-update-category.component';

describe('FormCreateUpdateCategoryComponent', () => {
  let component: FormCreateUpdateCategoryComponent;
  let fixture: ComponentFixture<FormCreateUpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateUpdateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
