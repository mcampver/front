import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { addLabel, editLabel } from './labels.constant';

export const getLabelCreateDialog = (type: CrudDialogTypeEnum): string =>
  type === CrudDialogTypeEnum.CREATE ? addLabel : editLabel;
