import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldDef, Styling } from '../../models/form-definition.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input() field!: FormFieldDef;
  @Input() form!: FormGroup;
  @Input() styling: Styling = {};
}
