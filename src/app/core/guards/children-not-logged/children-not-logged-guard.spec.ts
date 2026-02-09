import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { childrenNotLoggedGuard } from './children-not-logged-guard';

describe('childrenNotLoggedGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => childrenNotLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
