import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderClientComponent } from 'src/app/layouts/client/header-client/header-client.component';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css'],
})
export class DialogSearchComponent {
  constructor(
    public dialogRef: MatDialogRef<HeaderClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
