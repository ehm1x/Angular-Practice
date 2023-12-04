import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rostersGuard } from './rosters.guard';

describe('rostersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rostersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
