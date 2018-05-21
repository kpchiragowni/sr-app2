import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,
  Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})

export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<object> =
              new EventEmitter<object>();

  @ViewChild('filterElement') filterElementRef: ElementRef;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit({
      'listFilter': this.listFilter,
      'sortBy': this.sortBy
    });
  }

  private _sortBy: string;
  get sortBy(): string {
    return this._sortBy;
  }
  set sortBy(value: string) {
    this._sortBy = value;
    this.valueChange.emit({
      'listFilter': this.listFilter,
      'sortBy': this.sortBy
    });
  }

  public sortColumns = [
    {
      'value': 'averageInvestment',
      'viewValue': 'Average Investment'
    },
    {
      'value': 'totalRaised',
      'viewValue': 'Total Raised'
    }
  ];

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef.nativeElement) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }

  ngOnInit() {
  }

}
