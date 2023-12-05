import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { RostersGuard } from './rosters.guard';

describe('RostersGuard', () => {
  let guard: RostersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RostersGuard],
    });
    guard = TestBed.inject(RostersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});