import { TestBed } from '@angular/core/testing';

import { FooterSerivce } from './footer.serivce';

describe('FooterSerivce', () => {
  let service: FooterSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterSerivce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
