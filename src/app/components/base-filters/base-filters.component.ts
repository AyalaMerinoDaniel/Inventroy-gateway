import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-filters',
  templateUrl: './base-filters.component.html',
  styleUrls: ['./base-filters.component.scss']
})
export class BaseFiltersComponent implements OnInit {
  @Input() titlePage: string = '';
  @Input() textButton: string = 'Agregar'
  @Output() onClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  created(){
    this.onClick.emit();
  }

}
