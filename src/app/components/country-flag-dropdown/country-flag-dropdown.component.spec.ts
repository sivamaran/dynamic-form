import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFlagDropdownComponent } from './country-flag-dropdown.component';

describe('CountryFlagDropdownComponent', () => {
  let component: CountryFlagDropdownComponent;
  let fixture: ComponentFixture<CountryFlagDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryFlagDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryFlagDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
