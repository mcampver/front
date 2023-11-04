import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { stringLL, yearFormat } from './date-formats.constant';

export const MY_FORMATS = {
  parse: {
    dateInput: yearFormat,
  },
  display: {
    dateInput: yearFormat,
    YearLabel: yearFormat,
    dateA11yLabel: stringLL,
    YearA11yLabel: yearFormat,
  },
};

export const dateCapsule = {
  provide: DateAdapter,
  useClass: MomentDateAdapter,
  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
};

export const dateCapsuleProvider = {
  provide: MAT_DATE_FORMATS,
  useValue: MY_FORMATS,
};
