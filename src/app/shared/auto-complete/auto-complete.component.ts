import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IDatasourceAC } from './datasource-ac.interface';
import {
  IPaginateDTO,
  IPaginateOutDTO,
  ISearchFilter,
} from '@shared/components/data-grid/component/interface';
import { AllowedOperation } from '@shared/components/data-grid/component/enum/paginate-operator.enum';

@Component({
  selector: 'ai-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Provide a form value
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteComponent<T>
  implements ControlValueAccessor, OnChanges
{
  @Input() datasource: IDatasourceAC<IPaginateOutDTO<T>> | undefined;
  @Input() label: string | undefined;
  @Input() appearance: 'standard' | 'fill' | 'outline' = 'standard';
  @Input() take = 20;
  @Input() fields: string[] = [];
  @Input() required = true;

  @Output() valueChanged = new EventEmitter<T | undefined>();
  page = 0;

  valuePrimary: T | undefined; // This is the updated value that the class access
  simpleText = '';
  isDisable = false;
  data: Observable<T[]> | undefined;

  get value(): T | undefined {
    return this.valuePrimary;
  }

  set value(val: T | undefined) {
    if (
      val !== undefined &&
      (val as unknown as string) !== '' &&
      this.valuePrimary !== val
    ) {
      if (typeof val === 'object') {
        this.valuePrimary = val;
        this.valueChanged.emit(val);
      } else {
        this.simpleText = val as unknown as string;
      }
      this.onChange(val);
    } else {
      this.valuePrimary = val;
      this.onChange(val);
      this.simpleText = val as unknown as string;
    }
    this.loadData({
      skip: this.page * this.take,
      take: this.take,
    });
  }

  @HostBinding('blur')
  onTouched: () => void = () => {};

  @Input() showExpr: (args: T) => string = () => '';
  onChange = (_: T | undefined) => {};

  // onTouched = () => { }
  onBlur(e: unknown) {
    this.onTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.datasource = changes['datasource']
      .currentValue as unknown as IDatasourceAC<IPaginateOutDTO<T>>;
    this.loadData({ skip: this.page * this.take, take: this.take });
  }

  /**
   * This method sets the value programatically
   *
   * @param obj
   */
  writeValue(obj: T): void {
    this.valuePrimary = obj;
  }

  /**
   * Upon UI element value changes, this method gets triggered
   *
   * @param fn
   */
  registerOnChange(fn: (_: T | undefined) => T): void {
    this.onChange = fn;
  }

  /**
   * Upon touching the element, this method gets triggered
   *
   * @param fn
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Tells if the component is disabled
   *
   * @param isDisabled true if the component is desabled, false otherwise.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  /**
   * Load the data from database
   * @param options filter options
   * @param select true when we need to list and select the first automaticly, false if not.
   */
  loadData(options: IPaginateDTO = {}, select = false): void {
    this.page = 0;
    const filters: ISearchFilter[] = [];
    if (!select) {
      this.fields.map((x) => {
        if (this.simpleText) {
          const data = this.simpleText;
          filters.push({
            field: x,
            operation: 'CONTAINS' as AllowedOperation,
            values: [data],
          });
        }
      });
      options.orSearchFields = filters;
    }
    this.datasource
      ?.load(options)
      ?.pipe(debounceTime(300))
      .subscribe((x) => {
        this.data = of(x.items);
        if (select && x.items.length > 0 && this.value !== x.items[0]) {
          this.value = x.items[0];
        }
      });
  }

  getKey(object: T, key = ''): string {
    const value = object
      ? Object.keys(object).find((x) => x == key)
      : undefined;
    return value ? value : '';
  }
}
