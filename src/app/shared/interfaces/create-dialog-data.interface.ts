// import { CreateDialogType } from '@shared/enums/create-dialog-type.enum';

// export interface ICreateDialogData<T> {
//   data: T;
//   createType: CreateDialogType;
// }

import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';

export class CreateDialogData {
  constructor(
    public id?: string,
    public createType?: CrudDialogTypeEnum,
    public obj?: any
  ) {}
}
