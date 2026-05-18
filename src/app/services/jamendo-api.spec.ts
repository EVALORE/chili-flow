import { TestBed } from '@angular/core/testing';

import { JamendoService } from './jamendo-api';

describe('JamendoService', () => {
  let service: JamendoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
