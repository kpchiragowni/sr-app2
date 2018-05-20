import { Component, OnInit } from '@angular/core';

import { OpportunityService } from '../../services/opportunity.service';
import { IOpportunity } from '../../models/opportunity';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  public opportunities: IOpportunity[];

  constructor(private opportunityService: OpportunityService) { }

  ngOnInit() {
    this.opportunityService.opporutnites().subscribe(res => {
      this.opportunities = res.opportunities;
    });
  }

}
