import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { LoadingDialogComponent } from 'src/app/shared/dialogs/loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
 private loadingDialogRef?: MatDialogRef<LoadingDialogComponent>
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

  showDialogLoading(){
    if(!this.loadingDialogRef){
      this.loadingDialogRef = this.matDialog.open(LoadingDialogComponent, {
      width: '25%',
      height: '35%',
      disableClose: true
    });
    }
  }

  closeDialogLoading() {
    if (this.loadingDialogRef) {
      this.loadingDialogRef.close();
      this.loadingDialogRef = undefined;
    }
  }
}
