import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunFlashcardComponent } from './run-flashcard.component';

describe('RunFlashcardComponent', () => {
  let component: RunFlashcardComponent;
  let fixture: ComponentFixture<RunFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunFlashcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
