import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { catchError, tap, map } from 'rxjs/operators';

import { IOpportunities, IOpportunity } from '../models/opportunity';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OpportunityService {

  private opportunitiesUrl = 'api/data.json';
  private opportunites: IOpportunity[];

  constructor(private http: HttpClient) { }

  getOpportunities(): Observable<IOpportunity[]> {
    if (this.opportunites) {
        return of(this.opportunites);
    }
    return this.http.get<IOpportunity[]>(this.opportunitiesUrl)
                    .pipe(
                        tap(data => console.log(JSON.stringify(data))),
                        map(data => data['opportunities']),
                        tap(data => this.opportunites = data),
                        catchError(this.handleError)
                    );
  }

  private handleError(err: HttpErrorResponse): ErrorObservable {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    console.error(err);
    return new ErrorObservable(errorMessage);
  }

}
