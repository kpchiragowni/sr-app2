import { Component, OnInit, ViewChild } from '@angular/core';

import { OpportunityService } from '../../services/opportunity.service';
import { IOpportunity, IOpportunities } from '../../models/opportunity';

import { CriteriaComponent } from '../../shared/criteria/criteria.component';
import { ParameterService } from '../../services/parameter.service';

import * as util from '../../shared/util';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  public opportunities: IOpportunity[];
  public filteredOpportunities: IOpportunity[];
  public viewType = 'grid';

  public tradingActive: boolean;
  public eis: boolean;
  public seis: boolean;

  public errorMessage: any;

  // the value of each key is an array with the values to filter
  private filters = {
    tradingActive: [],
    eis: [],
    seis: []
  };

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  constructor(private opportunityService: OpportunityService,
    private parameterService: ParameterService) { }

 ngOnInit(): void {
    this.opportunityService.getOpportunities().subscribe(
        (opportunities: IOpportunity[]) => {
            this.opportunities = opportunities;
            this.filterComponent.listFilter = this.parameterService.filterBy;
            this.filterComponent.sortBy = this.parameterService.sortBy;
        },
        (error: any) => this.errorMessage = <any>error
    );
  }

 /**
 * On Filters changes an array of objects with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria as the property names
 * @return {Array}
 */
  onValueChange(value: object): void {
      this.parameterService.filterBy = value['listFilter'];
      this.parameterService.sortBy = value['sortBy'];
      this.performFilter(value['listFilter']);
      console.log(value);
      if (value && value['sortBy']) {
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
    if (this.parameterService.filterBy) {
      this.filteredOpportunities = this.filteredOpportunities.sort((a, b) => {
        return a[this.parameterService.sortBy] - b[this.parameterService.sortBy];
      });
    } else {
      this.filteredOpportunities = this.opportunities.sort((a, b) => {
        return a[this.parameterService.sortBy] - b[this.parameterService.sortBy];
      });
    }
  }

  onToggleFilters(key) {
    if (key === 'tradingActive') {
      this.tradingActive = !this.tradingActive;
    } else if (key === 'eis') {
      this.eis = !this.eis;
    } else if (key === 'seis') {
      this.seis = !this.seis;
    }

    this.filters = {
      tradingActive: [ this.tradingActive ],
      eis: [ this.eis ],
      seis: [ this.seis ]
    };

    console.log(this.filters);

    this.filteredOpportunities = <IOpportunity[]>util.multiFilter(this.opportunities, this.filters);
  }
}
