import { Component, OnInit, ViewChild } from '@angular/core';

import { OpportunityService } from '../../services/opportunity.service';
import { IOpportunity, IOpportunities } from '../../models/opportunity';

import { CriteriaComponent } from '../../shared/criteria/criteria.component';
import { ParameterService } from '../../services/parameter.service';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  public opportunities: IOpportunity[];
  public filteredOpportunities: IOpportunity[];

  public errorMessage: any;

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  constructor(private opportunityService: OpportunityService,
    private parameterService: ParameterService) { }

 ngOnInit(): void {
    this.opportunityService.getOpportunities().subscribe(
        (opportunities: IOpportunity[]) => {
            this.opportunities = opportunities;
            this.filterComponent.listFilter = this.parameterService.filterBy;
        },
        (error: any) => this.errorMessage = <any>error
    );
  }

  onValueChange(value: object): void {
      this.parameterService.filterBy = value['listFilter'];
      this.performFilter(value['listFilter']);
      if(value && value['sortBy']){
        this.performSort(value['sortBy']);
      }
  }

  performFilter(filterBy?: string): void {
      if (filterBy) {
          this.filteredOpportunities = this.opportunities.filter((opp: IOpportunity) =>
              opp.company.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
      } else {
          this.filteredOpportunities = this.opportunities;
      }
  }

  performSort(value) {
    this.filteredOpportunities = this.filteredOpportunities.sort(opp => opp.totalRaised);
  }

}
