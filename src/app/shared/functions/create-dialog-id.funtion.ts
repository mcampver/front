import { inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateDialogData } from '@shared/interfaces/create-dialog-data.interface';

export const createDialogIdFn = () => {
  const data: CreateDialogData = inject<CreateDialogData>(MAT_DIALOG_DATA);

  return () => data.id;
};
