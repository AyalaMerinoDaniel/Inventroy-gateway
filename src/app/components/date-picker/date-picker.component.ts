import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() appearance: 'fill' | 'outline' | 'standard' | 'legacy' = 'outline';
  @Input() blockDates: { past?: boolean; future?: boolean } = {};
  @Input() debounce = 300;

  @Output() valueChanged = new EventEmitter<Date>();

  constructor(){}

  ngOnInit(): void {
  }

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;

    const today = moment().startOf('day');
    const date = moment(d).startOf('day');

    if (this.blockDates.past && date.isBefore(today, 'day')) {
      return false;
    }

    if (this.blockDates.future && date.isAfter(today, 'day')) {
      return false;
    }

    return true;
  };

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    if(selectedDate){
      setTimeout(() => {
        this.valueChanged.emit(selectedDate);
      }, this.debounce);
    }
    
  }

}
