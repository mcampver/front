import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  indicatorRotate,
  panelExpandedTrigger,
} from '../menu-list-item/menu-list-item.animation';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';
import { MenuListItemPinnedService } from './menu-list-item-pinned.service';
import { INavItem } from '../menu-list-item/nav-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ai-menu-list-item-pinned',
  templateUrl: './menu-list-item-pinned.component.html',
  styleUrls: ['../menu-list-item/menu-list-item.component.scss'],
  animations: [indicatorRotate, panelExpandedTrigger],
})
export class MenuListItemPinnedComponent
  extends MenuListItemComponent
  implements OnDestroy
{
  @HostBinding('attr.aria-expanded')
  override ariaExpanded = false;

  override item: INavItem = {
    displayName: 'Fijados',
    iconName: 'push_pin',
    pack: 'aicros',
  };

  override depth = 0;
  list?: Subscription;

  constructor(
    protected override router: Router,
    protected override listItemPinnedService: MenuListItemPinnedService
  ) {
    super(router, listItemPinnedService);
    this.initialSubscribe();
    this.initialCharged();
  }

  override get isLeaf(): boolean {
    return false;
  }

  override get isFather(): boolean {
    return true;
  }

  get hasChildren(): boolean {
    return !!this.item.children?.length;
  }

  ngOnDestroy(): void {
    this.list?.unsubscribe();
  }

  initialSubscribe(): void {
    this.list = this.listItemPinnedService.dataChange.asObservable().subscribe({
      next: (changed) => {
        if (changed) {
          this.initialCharged();
          this.ngOnInit();
        }
      },
    });
  }

  initialCharged(): void {
    this.item['children'] = Array.from(
      this.listItemPinnedService.mapPinnedItem
    );
  }
}
