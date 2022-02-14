import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaHomeComponent } from './spa-home.component';

describe('SpaHomeComponent', () => {
  let component: SpaHomeComponent;
  let fixture: ComponentFixture<SpaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
