import { TestBed } from '@angular/core/testing';

import { GherasData } from './gheras-data';

describe('GherasData', () => {
  let service: GherasData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GherasData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
