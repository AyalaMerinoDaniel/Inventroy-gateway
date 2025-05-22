import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateproductDialogComponent } from './create-updateproduct-dialog.component';

describe('CreateUpdateproductDialogComponent', () => {
  let component: CreateUpdateproductDialogComponent;
  let fixture: ComponentFixture<CreateUpdateproductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateproductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateproductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
