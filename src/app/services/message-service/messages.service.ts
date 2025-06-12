import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.showSnackBar(message, 'success')
  }

  showWarning(message: string) {
    this.showSnackBar(message, 'warning')
  }

  showError(message: string) {
    this.showSnackBar(message, 'error')
  }

  showSnackBar(message: string, type: string ,duration: number = 5000){
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['custom-snackbar', type],
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
