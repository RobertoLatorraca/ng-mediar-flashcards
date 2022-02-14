import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFlashcardsComponent } from './add-edit-flashcards.component';

describe('AddEditFlashcardsComponent', () => {
  let component: AddEditFlashcardsComponent;
  let fixture: ComponentFixture<AddEditFlashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFlashcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
