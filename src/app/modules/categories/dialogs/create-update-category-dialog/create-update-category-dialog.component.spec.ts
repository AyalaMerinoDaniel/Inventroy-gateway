import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCategoryDialogComponent } from './create-update-category-dialog.component';

describe('CreateUpdateCategoryDialogComponent', () => {
  let component: CreateUpdateCategoryDialogComponent;
  let fixture: ComponentFixture<CreateUpdateCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
