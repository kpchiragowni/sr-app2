import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OpportunityService } from './opportunity.service';

describe('OpportunityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ OpportunityService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([OpportunityService], (service: OpportunityService) => {
    expect(service).toBeTruthy();
  }));
});
