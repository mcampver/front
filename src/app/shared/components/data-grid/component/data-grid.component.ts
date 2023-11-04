import {
  AfterViewInit,
  AfterContentInit,
  Component,
  Input,
  ViewChild,
  OnDestroy,
  ContentChild,
  ContentChildren,
  QueryList,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectorRef,
} from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { SelectionModel } from '@angular/cdk/collections';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';

import { MatSort } from '@angular/material/sort';

import { ISearchFilter } from './interface/search-filter.interface';
import { ISorting } from './interface/sorting.interface';
import { IColumnFilterData } from './interface/column-filter-data.interface';
import { IPaginateOutDTO } from './interface/paginate-out.interface';
import { IRow } from './interface/row.interface';
import { IServeData } from './interface/serve-data.interface';
import { AllowedOperation } from './enum/paginate-operator.enum';
import {
  MatSelectFooterCellComponent,
  MatFooterComponent,
  MatPaginatorDataTableComponent,
  MatErrorDataTableComponent,
  MatOptionTableComponent,
  MatColumnTableComponent,
} from './complementary';

@Component({
  selector: 'ai-mat-data-table',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent<T extends { id: string }>
  implements OnChanges, AfterViewInit, AfterContentInit, OnDestroy
{
  @Input() verticalLine = false;
  @Input() serviceData: IServeData<T> = {
    findAllPagination: (): Observable<IPaginateOutDTO<T>> =>
      of({ count: 0, items: [] }),
  };

  @Input() selectColumn = true;
  @Input() selectAvailable = false;
  @Input() selectMultiple = true;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable, { static: true }) matTabla?: MatTable<T>;

  @ContentChild(MatPaginatorDataTableComponent)
  contentPaginator?: MatPaginatorDataTableComponent;

  @ContentChild(MatErrorDataTableComponent)
  contentError?: MatErrorDataTableComponent;

  @ContentChild(MatOptionTableComponent)
  contentOption?: MatOptionTableComponent;

  @ContentChild(MatSelectFooterCellComponent)
  selectFoot?: MatSelectFooterCellComponent;

  @ContentChildren(MatColumnTableComponent)
  contentColumns?: QueryList<MatColumnTableComponent>;

  @ContentChildren(MatFooterComponent)
  contentFooters?: QueryList<MatFooterComponent>;

  displayedColumns: string[] = ['select'];
  displayedFilterColumns: string[] = [];
  dataSource: MatTableDataSource<T>;
  selection!: SelectionModel<string>;
  selectionRaw!: SelectionModel<T>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataStructure = new FormGroup({
    filtersState: new FormArray([]),
  });

  /**Paginator variables*/
  pageSizeOptions = [10, 25, 100];
  showFirstLastButtons = true;
  hidePageSize = false;
  colorPaginator: ThemePalette = 'primary';
  colorProgressBar: ThemePalette = 'primary';
  disabledPaginator = false;

  private _reloadSubject: Subject<unknown>;
  private _inputRowVisibility = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<T>([]);
    this._reloadSubject = new Subject<unknown>();
    this.selection = new SelectionModel<string>(true, []);
    this.selectionRaw = new SelectionModel<T>(true, []);
  }

  /** Gets */
  get skip(): number | undefined {
    return this.paginator?.pageSize && this.paginator?.pageIndex
      ? this.paginator?.pageSize * this.paginator?.pageIndex
      : 0;
  }

  get sortFilter(): ISorting | undefined {
    if (this.sort) {
      if (!this.sort.direction) return undefined;
      return {
        selector: this.sort.active,
        desc: this.sort.direction === 'desc',
      };
    }
    return undefined;
  }

  get filtersState(): FormArray {
    return this.dataStructure.get('filtersState') as FormArray;
  }

  get data(): T[] {
    return this.dataSource ? this.dataSource.data : [];
  }

  /** Methods to control the data entry row */
  get isInputRowVisibility(): boolean {
    return this._inputRowVisibility;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectMultipleOnChanges(changes['selectMultiple']);
  }

  ngAfterContentInit(): void {
    this.buildColumns();
    this.buildOption();
    this.initContentPaginator();
  }

  ngAfterViewInit(): void {
    this.subscriptionServicesServer();
    this.buildCell();
    this.buildFooter();
  }

  ngOnDestroy(): void {
    this._reloadSubject.unsubscribe();
  }

  optionColumn(index: number): string {
    return (this.filtersState.value as IColumnFilterData[])[index]['typeData'];
  }

  resetFilter(id: number): void {
    (this.filtersState.controls[id] as FormGroup).controls[
      'filterData'
    ].setValue('');
    (this.filtersState.controls[id] as FormGroup).controls[
      'filterDataBetween'
    ].setValue('');
    (this.filtersState.controls[id] as FormGroup).controls[
      'optionFilterData'
    ].setValue(this.contentColumns?.toArray()[id].defaultFilter);
  }

  reloadData(): void {
    this._reloadSubject.next(true);
  }

  dataValidFilter(dataColumnFilter: IColumnFilterData): boolean {
    if (dataColumnFilter.typeData === '1') {
      return (
        this.isNumber(dataColumnFilter.filterData) &&
        (dataColumnFilter.filterDataBetween
          ? this.isNumber(dataColumnFilter.filterDataBetween)
          : true)
      );
    }
    return true;
  }

  isNumber(number: string): boolean {
    return !isNaN(+number);
  }

  /**The classification by type is:
   * 1- numbers
   * 2- string
   * 3- date
   */
  getType(type: 'number' | 'string' | 'date'): string {
    if (type.toLowerCase() === 'date' || type.toLowerCase().startsWith('d')) {
      return '3';
    } else if (
      type.toLowerCase() === 'number' ||
      type.toLowerCase().startsWith('n')
    ) {
      return '1';
    } else {
      return '2';
    }
  }

  /** CheckBox methods */

  selectRow(row: T): void {
    if (this.selectAvailable) {
      this.selection.toggle(row.id);
      this.selectionRaw.toggle(row);
    }
  }

  deselectRows(
    ids: string[],
    filterFunction = (id: string, raw: IRow) => id === raw.id
  ): void {
    if (ids.length === 0) {
      this.selection.clear();
      this.selectionRaw.clear();
      return;
    }
    this.selection.deselect(...ids);
    this.selectionRaw.deselect(
      ...this.selectionRaw.selected.filter((raw: IRow) =>
        ids.some((id) => filterFunction(id, raw))
      )
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
    return numSelected === this.resultsLength;
  }

  /** Whether the number of selected elements matches the total number of rows in actually page. */
  isAllSelectedInActuallyPage(): boolean {
    for (const i of this.data) {
      if (!this.selection.isSelected(i.id)) {
        return false;
      }
    }
    return true;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectionRaw.clear();
      return;
    }

    if (this.isAllSelectedInActuallyPage()) {
      for (const i of this.data) {
        this.selection.toggle(i.id);
        this.selectionRaw.toggle(i);
      }
      return;
    }
    for (const i of this.data) {
      this.selection.select(i.id);
      this.selectionRaw.select(i);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(id?: string): string {
    if (!id) {
      return `header`;
    }
    return `${this.selection.isSelected(id) ? 'deselect' : 'select'} row ${id}`;
  }

  toggleInputRowVisibility(): void {
    this._inputRowVisibility = !this.isInputRowVisibility;
  }

  showInputRowVisibility(): void {
    this._inputRowVisibility = true;
  }

  hiddenInputRowVisibility(): void {
    this._inputRowVisibility = false;
  }

  // ends

  pageEvent(pageIndex: number): PageEvent | undefined {
    if (this.paginator) {
      return {
        length: this.paginator.length,
        previousPageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        pageIndex: pageIndex,
      };
    }
    return undefined;
  }

  private buildColumns(): void {
    this.contentColumns?.forEach((column) => {
      this.filtersState.push(
        new FormGroup({
          filterData: new FormControl(''),
          filterDataBetween: new FormControl(''),
          optionFilterData: new FormControl(column.defaultFilter),
          typeData: new FormControl(this.getType(column.type)),
        })
      );
      this.displayedColumns.push(column.matColumnDef.name);
      if (column.filter) {
        this.displayedFilterColumns.push(column.matColumnDef.name + '-filter');
      }
    });
  }

  private buildOption(): void {
    if (this.contentOption?.matColumnDef.cell) {
      this.displayedColumns.push('option');
    }
  }

  private buildCell(): void {
    this.matTabla?._contentColumnDefs.forEach((column) => {
      this.contentColumns?.forEach((contentColumn) => {
        if (column.name === contentColumn.matColumnDef.name) {
          if (contentColumn.matColumnDef.cell) {
            column.cell = contentColumn.matColumnDef.cell;
          }
          if (contentColumn.matColumnDef.footerCell) {
            column.footerCell = contentColumn.matColumnDef.footerCell;
          }
        } else if (column.name === 'option') {
          if (this.contentOption?.matColumnDef.cell) {
            column.cell = this.contentOption?.matColumnDef.cell;
          }
          if (this.contentOption?.matColumnDef.footerCell) {
            column.footerCell = this.contentOption?.matColumnDef.footerCell;
          }
        } else if (column.name === 'select') {
          if (this.selectFoot?.matColumnDef.footerCell) {
            column.footerCell = this.selectFoot?.matColumnDef.footerCell;
          }
        }
      });
    });
  }

  private buildFooter(): void {
    this.contentFooters?.forEach((contentFooter) => {
      contentFooter.footerCells?.forEach((column) => {
        this.matTabla?.addColumnDef(column.matColumnDef);
      });
      if (contentFooter.matFooterRowDef) {
        this.matTabla?.addFooterRowDef(contentFooter.matFooterRowDef);
      }
    });
  }

  private initContentPaginator() {
    this.pageSizeOptions = this.contentPaginator?.pageSizeOptions || [
      10, 25, 100,
    ];
    this.showFirstLastButtons =
      this.contentPaginator?.showFirstLastButtons || true;
    this.hidePageSize = this.contentPaginator?.hidePageSize || false;
    this.colorPaginator = this.contentPaginator?.color || 'primary';
    this.disabledPaginator = this.contentPaginator?.disabled || false;
    this.colorProgressBar =
      this.contentPaginator?.colorProgressBar || 'primary';
  }

  private decorationFilterData(): ISearchFilter[] {
    const dataDecorate: ISearchFilter[] = [];
    let i = 0;

    this.contentColumns?.forEach((column) => {
      const dataColumnFilter: IColumnFilterData = (
        this.filtersState.value as IColumnFilterData[]
      )[i];

      if (
        column.filter &&
        dataColumnFilter.filterData &&
        this.dataValidFilter(dataColumnFilter) &&
        !(
          dataColumnFilter.optionFilterData.toString() === 'between' &&
          !dataColumnFilter.filterDataBetween
        )
      ) {
        const values = [dataColumnFilter.filterData];
        if (dataColumnFilter.filterDataBetween) {
          dataDecorate.push({
            field: column.matColumnDef.name,
            operation: 'MORE_THAN_OR_EQUAL' as AllowedOperation,
            values: values,
          });
          dataDecorate.push({
            field: column.matColumnDef.name,
            operation: 'MORE_THAN_OR_EQUAL' as AllowedOperation,
            values: [dataColumnFilter.filterDataBetween],
          });
        } else {
          dataDecorate.push({
            field: column.matColumnDef.name,
            operation: dataColumnFilter.optionFilterData,
            values: values,
          });
        }
      }
      i++;
    });
    return dataDecorate;
  }

  private subscriptionServicesServer(): void {
    /** If the user changes the sort order, reset back to the first page.*/
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.page.emit(this.pageEvent(0));
      }
      //this.reloadData();
    });
    /** If the user changes the filter dates, reset back to the first page.*/
    this.filtersState.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (this.paginator) {
        this.paginator.page.emit(this.pageEvent(0));
      }
      //this.reloadData();
    });

    if (this.sort && this.paginator) {
      merge(
        //this.sort.sortChange,
        this.paginator.page,
        //this.filtersState.valueChanges.pipe(debounceTime(500)),
        this._reloadSubject.asObservable()
      )
        .pipe(
          startWith({}),
          switchMap((): Observable<IPaginateOutDTO<T> | null> => {
            this.isLoadingResults = true;
            this.cdr.detectChanges();
            return this.serviceData
              .findAllPagination(
                this.skip,
                this.paginator?.pageSize,
                this.sortFilter,
                this.decorationFilterData()
              )
              .pipe(catchError(() => of(null)));
          }),
          map((data: IPaginateOutDTO<T> | null) => {
            // Flip flag to show-cl that loading has finished.
            this.isLoadingResults = false;
            this.cdr.detectChanges();
            this.isRateLimitReached = data === null;

            if (data === null) {
              return [];
            }
            // Only refresh the result length if there is new data. In case of rate
            // limit errors, we do not want to reset the paginator to zero, as that
            // would prevent users from re-triggering requests.
            this.resultsLength = data.count;
            return data.items;
          })
        )
        .subscribe((data) => (this.dataSource.data = data));
    }
  }

  private selectMultipleOnChanges(change: SimpleChange): void {
    if (change && change.currentValue !== change.firstChange) {
      this.selection = new SelectionModel<string>(
        change.currentValue as boolean,
        this.selection.selected
      );
      this.selectionRaw = new SelectionModel<T>(
        change.currentValue as boolean,
        this.selectionRaw.selected
      );
    }
  }
}
