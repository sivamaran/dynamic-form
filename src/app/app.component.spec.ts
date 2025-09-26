import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

// Import our models, services, and components
import { FormDefinition, FormFieldDef, ModalState } from './models/form-definition.model';
import { GeminiFormService } from './services/gemini-form.service';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { TableWidgetComponent } from './components/table-widget/table-widget.component';
import { SubmissionModalComponent } from './components/submission-modal/submission-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // This imports array is the key to fixing the errors
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormFieldComponent,
    TableWidgetComponent,
    SubmissionModalComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  prompt = 'Create a simple contact form with fields for name (text) and message (textarea). Also include a table widget for phone numbers with columns for Type (e.g. Home, Work) and Number. When submitted, show the data in a modal.';
  formDefinition: FormDefinition | null = null;
  isLoading = false;
  error: string | null = null;

  modalState: ModalState = { isOpen: false, title: '', content: '', type: 'info' };

  dynamicForm: FormGroup = this.fb.group({});

  constructor(
    private geminiService: GeminiFormService,
    private fb: FormBuilder
  ) {}

  async generateForm() {
    // ... function code
  }

  private buildReactiveForm(fields: FormFieldDef[]) {
    // ... function code
  }

  async onSubmit() {
   // ... function code
  }

  showModal(title: string, content: string, type: 'info' | 'success' | 'error') {
    // ... function code
  }

  closeModal() {
    // ... function code
  }
}