import { TestBed } from '@angular/core/testing';

import { GeminiFormService } from './gemini-form.service';

describe('GeminiFormService', () => {
  let service: GeminiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
