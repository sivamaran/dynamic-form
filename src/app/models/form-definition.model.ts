// src/app/models/form-definition.model.ts

export interface FormDefinition {
  fields: FormFieldDef[];
  styling: Styling;
  onSubmit: OnSubmit;
}

export interface FormFieldDef {
  componentType: 'field' | 'widget';
  fieldName: string;
  label: string;
  fieldType?: 'text' | 'email' | 'textarea' | 'select';
  options?: string[];
  validation?: { required: boolean };
  widgetName?: 'TableWidget' | 'CheckboxWidget' | 'CountryFlagDropDownWidget';
  props?: {
    columns?: { header: string; key: string; }[];
    options?: string[];
  };
  defaultValue?: any; // Added for autofill functionality
}

export interface Styling {
  formBackground?: string;
  fieldBackground?: string;
  labelColor?: string;
  textColor?: string;
  buttonColor?: string;
  tableBackground?: string;
  tableBorderColor?: string;
}

export interface OnSubmit {
  action: 'webhook' | 'modal';
  url?: string;
}

export interface ModalState {
    isOpen: boolean;
    title: string;
    content: string;
    type: 'info' | 'success' | 'error';
}