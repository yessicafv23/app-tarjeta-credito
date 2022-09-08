import { TestBed } from '@angular/core/testing';

import { TajetaService } from './tajeta.service';

describe('TajetaService', () => {
  let service: TajetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TajetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
