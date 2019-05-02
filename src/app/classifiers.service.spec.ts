import { TestBed } from '@angular/core/testing';

import { ClassifiersService } from './classifiers.service';

describe('ClassifiersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassifiersService = TestBed.get(ClassifiersService);
    expect(service).toBeTruthy();
  });
});
