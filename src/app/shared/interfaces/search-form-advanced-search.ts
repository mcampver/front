import { FormControl } from '@angular/forms';

export interface ISearchFormAdvancedSearch {
  code: FormControl<string | null>;
  title: FormControl<string | null>;
  year: FormControl<string | null>;
  pages: FormControl<number | null>;
  state: FormControl<string | null>;
  type: FormControl<string | null>;
  technicalCommittees: FormControl<string | null>;
}
