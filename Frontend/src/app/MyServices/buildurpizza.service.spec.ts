import { TestBed } from '@angular/core/testing';

import { BuildurpizzaService } from './buildurpizza.service';

describe('BuildurpizzaService', () => {
  let service: BuildurpizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildurpizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
