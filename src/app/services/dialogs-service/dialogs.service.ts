import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private matDialog: MatDialog) {}

  showDialogConfirm(title: string, message: string){
    const ref = this.matDialog.open(ConfirmDialogComponent, {
      width: '40%',
      height: '40%',
      disableClose: true
    });
    ref.componentInstance.titleDialog = title;
    ref.componentInstance.message = message;

    return ref;
  }
}
