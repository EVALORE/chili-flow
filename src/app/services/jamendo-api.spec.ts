import { TestBed } from '@angular/core/testing';

import { JamendoApi } from './jamendo-api';

describe('JamendoApi', () => {
  let service: JamendoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
