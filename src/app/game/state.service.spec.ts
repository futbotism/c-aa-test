import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('State.TsService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
