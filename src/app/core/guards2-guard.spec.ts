import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { guards2Guard } from './guards2-guard';

describe('guards2Guard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guards2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
