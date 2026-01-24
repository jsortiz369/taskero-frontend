import { TestBed } from '@angular/core/testing';

import { UserLoggedIn } from './user-logged-in';

describe('UserLoggedIn', () => {
  let service: UserLoggedIn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoggedIn);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
