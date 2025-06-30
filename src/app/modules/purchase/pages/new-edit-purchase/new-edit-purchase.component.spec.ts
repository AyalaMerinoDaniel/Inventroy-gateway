import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditPurchaseComponent } from './new-edit-purchase.component';

describe('NewEditPurchaseComponent', () => {
  let component: NewEditPurchaseComponent;
  let fixture: ComponentFixture<NewEditPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
