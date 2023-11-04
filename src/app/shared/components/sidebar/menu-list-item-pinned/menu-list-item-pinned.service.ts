import { Injectable } from '@angular/core';
import { INavItem } from '../menu-list-item/nav-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuListItemPinnedService {
  dataChange = new BehaviorSubject<boolean>(false);
  private readonly _mapPinnedItem: Map<string, INavItem> = new Map<
    string,
    INavItem
  >();

  constructor() {
    this.initBuildMap();
  }

  get mapPinnedItem(): IterableIterator<INavItem> {
    return this._mapPinnedItem.values();
  }

  initBuildMap(): void {
    const preswinxMenuItemPinned = localStorage.getItem(
      'preswinxMenuItemPinned'
    );
    const arrayPinnedItem: INavItem[] = preswinxMenuItemPinned
      ? JSON.parse(preswinxMenuItemPinned)
      : [];

    this.addItemPinned(...arrayPinnedItem);
  }

  addItemPinned(...items: INavItem[]): void {
    for (const item of items) {
      if (this._mapPinnedItem.has(item.route ?? '')) continue;
      this._mapPinnedItem.set(item.route ?? '', item);
    }
    this.changeData();
  }

  deleteItemPinned(...items: INavItem[]): void {
    for (const item of items) {
      if (!this._mapPinnedItem.has(item.route ?? '')) continue;
      this._mapPinnedItem.delete(item.route ?? '');
    }
    this.changeData();
  }

  isItemPinned(item: INavItem): boolean {
    return this._mapPinnedItem.has(item.route ?? '');
  }

  changeData(): void {
    this.dataChange.next(true);
    this.save();
  }

  save(): void {
    localStorage.setItem(
      'preswinxMenuItemPinned',
      JSON.stringify(Array.from(this.mapPinnedItem))
    );
  }
}
