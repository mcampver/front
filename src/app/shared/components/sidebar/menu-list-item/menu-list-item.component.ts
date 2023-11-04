import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { INavItem } from './nav-item';
import { IsActiveMatchOptions, Router } from '@angular/router';
import {
  indicatorRotate,
  panelExpandedTrigger,
} from './menu-list-item.animation';
import { MenuListItemPinnedService } from '../menu-list-item-pinned/menu-list-item-pinned.service';
import { MatTooltip } from '@angular/material/tooltip';

export function searchFindRoute(item: INavItem): string[] {
  const routes: string[] =
    !!item.route && item.route !== '' ? [item.route] : [];
  if (!item.children || !item.children?.length) return routes;
  for (const child of item.children) {
    routes.push(...searchFindRoute(child));
  }
  return routes;
}

@Component({
  selector: 'ai-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [indicatorRotate, panelExpandedTrigger],
})
export class MenuListItemComponent implements OnInit {
  @HostBinding('attr.aria-expanded') ariaExpanded = false;
  @Input() item: INavItem = { displayName: '', iconName: '' };
  @Input() depth = 0;
  expanded = false;
  childArrayRoutes?: string[];
  matchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  constructor(
    protected router: Router,
    protected listItemPinnedService: MenuListItemPinnedService
  ) {
    this.ariaExpanded = this.expanded;
  }

  get iconPinTooltip(): boolean {
    return this.isLeaf && this.listItemPinnedService.isItemPinned(this.item);
  }

  get msgIconPinTooltip(): string {
    return this.iconPinTooltip ? 'Desfijar' : 'Fijar';
  }

  get degIconPinTooltip(): string {
    return this.iconPinTooltip ? '0' : '45';
  }

  get isLeaf(): boolean {
    return !this.item.children || !this.item.children?.length;
  }

  get isFather(): boolean {
    return !!this.item.children && !!this.item.children?.length;
  }

  get isActive(): boolean {
    if (this.isLeaf) {
      return this.item.route
        ? this.router.isActive(this.item.route, this.matchOptions)
        : false;
    } else {
      return (
        this.childArrayRoutes?.some((route) =>
          this.router.isActive(route, this.matchOptions)
        ) ?? false
      );
    }
  }

  get isAicrosIcon(): boolean {
    return this.item.pack === 'aicros';
  }

  ngOnInit(): void {
    this.childArrayRoutes = searchFindRoute(this.item);
  }

  onClick(): void {
    if (this.isLeaf) this.onClickLeaf();
    if (this.isFather) this.onClickFather();
  }

  onClickLeaf(): void {
    this.router.navigate([this.item.route]).then();
  }

  onClickFather(): void {
    this.expanded = !this.expanded;
  }

  onAnimationStart(element: HTMLDivElement): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    element.style.overflow = 'hidden';
  }

  onAnimationDone(element: HTMLDivElement): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    element.style.overflow = 'unset';
  }

  pinIconClickTooltip(tooltip: MatTooltip): void {
    tooltip.hide(0);
  }

  pinIconClick(event: Event): void {
    event.stopPropagation();
    if (!this.isLeaf) return;

    if (this.listItemPinnedService.isItemPinned(this.item))
      this.listItemPinnedService.deleteItemPinned(this.item);
    else this.listItemPinnedService.addItemPinned(this.item);
  }
}
