import { FormControl } from '@angular/forms';

export interface ICreateFormGroupManageDocuments {
  documentType: FormControl<string | null>;
  docVisible: FormControl<boolean | null>;
  docNumber: FormControl<number | null>;
  docName: FormControl<string | null>;
  docYearCreation: FormControl<string | null>;
  docValidYear: FormControl<string | null>;
  docSummary: FormControl<string | null>;
  docNumberOfPages: FormControl<number | null>;
  docPay: FormControl<boolean | null>;
  docPrice: FormControl<number | null>;
  technicalCommittee: FormControl<string | null>;
  repeals: FormControl<boolean | null>;
  docRepeals: FormControl<string[] | null>;
  keywords: FormControl<string | null>;
  associatedKeywords: FormControl<string[] | null>;
  docUpload: FormControl<string | null>;
  url: FormControl<string | null>;
}
