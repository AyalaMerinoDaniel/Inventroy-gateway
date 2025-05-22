import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-filters',
  templateUrl: './base-filters.component.html',
  styleUrls: ['./base-filters.component.scss']
})
export class BaseFiltersComponent implements OnInit {
  @Input() titlePage: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
