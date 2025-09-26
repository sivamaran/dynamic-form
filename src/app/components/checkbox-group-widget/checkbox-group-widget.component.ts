import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Styling } from '../../models/form-definition.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-group-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox-group-widget.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupWidgetComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupWidgetComponent implements ControlValueAccessor, OnInit {
  @Input() options: string[] = [];
  @Input() styling: Styling = {};

  // Internal state to track checked status, e.g., { 'A': true, 'B': false }
  checkboxes: { [key: string]: boolean } = {};
  isDisabled = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit() {
    // Initialize the state based on the options provided by the AI
    this.options.forEach(option => {
      this.checkboxes[option] = false;
    });
  }

  writeValue(value: any): void {
    if (value && typeof value === 'object') {
      this.options.forEach(option => {
        this.checkboxes[option] = !!value[option];
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // When a checkbox value changes, update the internal state and notify the parent form
  onCheckboxChange() {
    this.onTouched();
    this.onChange(this.checkboxes);
  }
}
