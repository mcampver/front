import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDialogData {
  title?: string;
  message?: string;
  value?: number;
  icon?: string;
}

@Component({
  selector: 'ai-dialog-basic',
  templateUrl: './dialog-basic.component.html',
  styleUrls: ['./dialog-basic.component.scss'],
})
export class DialogBasicComponent implements OnInit {
  title = '';
  value = 1;
  message = '¿Está seguro que desea eliminar el elemento seleccionado?';

  icon = 'bolt_outline';

  constructor(
    // public dialogRef: MatDialogRef<DialogBasicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.title) this.title = this.data.title;
    if (this.data.value) this.value = this.data.value;
    if (this.data.message) this.message = this.data.message;
    if (this.data.icon) this.icon = this.data.icon;
  }
}
