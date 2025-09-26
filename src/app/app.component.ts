import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormDefinition, FormFieldDef, ModalState } from './models/form-definition.model';
import { GeminiFormService } from './services/gemini-form.service';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { TableWidgetComponent } from './components/table-widget/table-widget.component';
import { SubmissionModalComponent } from './components/submission-modal/submission-modal.component';
import { CheckboxGroupWidgetComponent } from './components/checkbox-group-widget/checkbox-group-widget.component';
// Import the new component
import { CountryFlagDropdownComponent } from './components/country-flag-dropdown/country-flag-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormFieldComponent,
    TableWidgetComponent,
    SubmissionModalComponent,
    CheckboxGroupWidgetComponent,
    CountryFlagDropdownComponent, // Add the new component here
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  prompt = 'Create a contact form with a name field and a phone number field with a country flag dropdown.';
  formDefinition: FormDefinition | null = null;
  isLoading = false;
  error: string | null = null;
  modalState: ModalState = { isOpen: false, title: '', content: '', type: 'info' };
  dynamicForm: FormGroup;

  constructor(
    private geminiService: GeminiFormService,
    private fb: FormBuilder
  ) {
    this.dynamicForm = this.fb.group({});
  }

  async generateForm() {
    this.isLoading = true;
    this.error = null;
    this.formDefinition = null;
    try {
      const definition = await this.geminiService.generateFormDefinition(this.prompt);
      this.formDefinition = definition;
      this.buildReactiveForm(definition.fields);
    } catch (e: any) {
      this.error = e.message;
    } finally {
      this.isLoading = false;
    }
  }

  private buildReactiveForm(fields: FormFieldDef[]) {
    const group: { [key: string]: FormControl } = {};
    fields.forEach(field => {
      // Use the new defaultValue property to pre-fill the form
      group[field.fieldName] = new FormControl(field.defaultValue || null);
    });
    this.dynamicForm = this.fb.group(group);
  }

  async onSubmit() {
    if (this.dynamicForm.invalid || !this.formDefinition) {
      this.error = 'Form is invalid or not defined.';
      return;
    }
    this.isLoading = true;
    const formData = this.dynamicForm.value;
    const { action, url } = this.formDefinition.onSubmit || {};
    if (action === 'webhook' && url) {
      try {
        await this.geminiService.postToWebhook(url, formData);
        this.showModal('Success!', 'Data successfully sent to webhook.', 'success');
      } catch (e: any) {
        this.showModal('Error!', `Failed to send data: ${e.message}`, 'error');
      }
    } else {
      this.showModal('Form Submitted', JSON.stringify(formData, null, 2), 'info');
    }
    this.isLoading = false;
  }

  showModal(title: string, content: string, type: 'info' | 'success' | 'error') {
    this.modalState = { isOpen: true, title, content, type };
  }

  closeModal() {
    this.modalState = { ...this.modalState, isOpen: false };
  }
}