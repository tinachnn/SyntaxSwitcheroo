import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConversionComponent } from './text-conversion.component';

describe('TextConversionComponent', () => {
  let component: TextConversionComponent;
  let fixture: ComponentFixture<TextConversionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextConversionComponent]
    });
    fixture = TestBed.createComponent(TextConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
