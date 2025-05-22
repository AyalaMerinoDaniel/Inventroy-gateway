import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateUpdateProductComponent } from './form-create-update-product.component';

describe('FormCreateUpdateProductComponent', () => {
  let component: FormCreateUpdateProductComponent;
  let fixture: ComponentFixture<FormCreateUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateUpdateProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
