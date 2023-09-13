import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionSelectorComponent } from './convention-selector.component';

describe('ConventionSelectorComponent', () => {
  let component: ConventionSelectorComponent;
  let fixture: ComponentFixture<ConventionSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConventionSelectorComponent]
    });
    fixture = TestBed.createComponent(ConventionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
