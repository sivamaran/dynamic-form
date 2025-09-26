import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Styling } from '../../models/form-definition.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-widget.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableWidgetComponent),
      multi: true
    }
  ]
})
export class TableWidgetComponent implements ControlValueAccessor {
  @Input() columns: { header: string, key: string }[] = [];
  @Input() styling: Styling = {};

  rows: any[] = [{}];
  isDisabled = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.rows = Array.isArray(value) && value.length > 0 ? value : [{}];
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

  private notifyChange() {
    this.onChange(this.rows);
    this.onTouched();
  }

  handleAddRow() {
    this.rows.push({});
    this.notifyChange();
  }

  handleRemoveRow(index: number) {
    this.rows.splice(index, 1);
    this.notifyChange();
  }

  handleCellChange(newValue: string, rowIndex: number, columnKey: string) {
    if (this.rows[rowIndex]) {
      this.rows[rowIndex][columnKey] = newValue;
      this.notifyChange();
    }
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
