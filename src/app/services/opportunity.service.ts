import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IOpportunities } from '../models/opportunity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpportunityService {

  constructor(private http: HttpClient) { }

  opporutnites(): Observable<IOpportunities> {
    return this.http.get<IOpportunities>('api/data.json');
  }

}
