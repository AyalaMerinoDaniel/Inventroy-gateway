import { Component, OnInit } from '@angular/core';
import { GENERAL_MESSAGES } from '../../constants/message.constants';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent implements OnInit {
  textLoading = GENERAL_MESSAGES.LOADING;
  constructor() { }

  ngOnInit(): void {
  }

}
