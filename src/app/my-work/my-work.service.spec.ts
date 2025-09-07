import { TestBed } from '@angular/core/testing';

import { MyWorkService } from './my-work.service';

describe('MyWorkService', () => {
  let service: MyWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
