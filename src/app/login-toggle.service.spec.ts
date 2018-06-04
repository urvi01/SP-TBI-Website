import { TestBed, inject } from '@angular/core/testing';

import { LoginToggleService } from './login-toggle.service';

describe('LoginToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginToggleService]
    });
  });

  it('should be created', inject([LoginToggleService], (service: LoginToggleService) => {
    expect(service).toBeTruthy();
  }));
});
