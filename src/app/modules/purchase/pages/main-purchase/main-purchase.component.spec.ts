import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPurchaseComponent } from './main-purchase.component';

describe('MainPurchaseComponent', () => {
  let component: MainPurchaseComponent;
  let fixture: ComponentFixture<MainPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
