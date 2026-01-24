import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { confirmAccountGuard } from './confirm-account-guard';

describe('confirmAccountGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confirmAccountGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
