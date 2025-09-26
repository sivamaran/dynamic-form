import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interface for our country data
interface Country {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-country-flag-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-flag-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryFlagDropdownComponent),
      multi: true
    }
  ]
})
export class CountryFlagDropdownComponent implements ControlValueAccessor {
  
  countries: Country[] = [
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
  ];

  selectedCountryCode: string = '+91'; // Default to India
  phoneNumber: string = '';
  isDisabled: boolean = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (typeof value === 'string' && value) {
      // Simple logic to split a full phone number if provided
      const country = this.countries.find(c => value.startsWith(c.code));
      if (country) {
        this.selectedCountryCode = country.code;
        this.phoneNumber = value.substring(country.code.length).trim();
      } else {
        this.phoneNumber = value;
      }
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

  // When either the dropdown or the input changes, notify the parent form
  onValueChange() {
    this.onTouched();
    const fullNumber = `${this.selectedCountryCode} ${this.phoneNumber}`;
    this.onChange(fullNumber);
  }
}
