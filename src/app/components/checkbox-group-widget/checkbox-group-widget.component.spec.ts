import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxGroupWidgetComponent } from './checkbox-group-widget.component';

describe('CheckboxGroupWidgetComponent', () => {
  let component: CheckboxGroupWidgetComponent;
  let fixture: ComponentFixture<CheckboxGroupWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxGroupWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
