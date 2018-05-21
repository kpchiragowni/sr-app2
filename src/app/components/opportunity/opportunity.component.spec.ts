import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../../shared/shared.module';

import { OpportunityComponent } from './opportunity.component';

import { OpportunityService } from '../../services/opportunity.service';
import { ParameterService } from '../../services/parameter.service';

describe('OpportunityComponent', () => {
  let component: OpportunityComponent;
  let fixture: ComponentFixture<OpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityComponent ],
      imports: [ SharedModule, HttpClientTestingModule ],
      providers: [ OpportunityService, ParameterService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
