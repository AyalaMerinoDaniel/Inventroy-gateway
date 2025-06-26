import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateUpdateUserComponent } from './form-create-update-user.component';

describe('FormCreateUpdateUserComponent', () => {
  let component: FormCreateUpdateUserComponent;
  let fixture: ComponentFixture<FormCreateUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateUpdateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
