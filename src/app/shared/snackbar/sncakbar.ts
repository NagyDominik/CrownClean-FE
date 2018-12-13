import { MatSnackBar } from '@angular/material';

export class CustomSnackbar {

    constructor (private snackBar: MatSnackBar) {}

    openSnackBar(message: string, duration: number) {
        this.snackBar.open(message, 'OK', {
          duration: duration,
        });
      }

}
