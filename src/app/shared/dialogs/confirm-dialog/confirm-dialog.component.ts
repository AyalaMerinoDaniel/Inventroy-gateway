import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  titleDialog: string = 'Confirmación'
  textButton: string = 'Confirmar';
  message: string = '';

  constructor(private matRefDialog: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.matRefDialog.close(true);
  }

}
