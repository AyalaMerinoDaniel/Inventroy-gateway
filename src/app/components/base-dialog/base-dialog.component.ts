import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent implements OnInit {
  @Input() titleDialog: string = '';

  constructor(private dialogRef: MatDialogRef<BaseDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
