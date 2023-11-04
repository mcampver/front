import { NgModule } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexModule } from '@angular/flex-layout';
import { AiSidebarComponent } from './sidebar.component';
import { MenuListItemPinnedComponent } from './menu-list-item-pinned/menu-list-item-pinned.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';

@NgModule({
  declarations: [
    AiSidebarComponent,
    MenuListItemPinnedComponent,
    MenuListItemComponent,
  ],
  imports: [
    MatListModule,
    NgForOf,
    MatIconModule,
    MatTooltipModule,
    NgIf,
    NgStyle,
    FlexModule,
    NgClass,
  ],
  exports: [AiSidebarComponent],
})
export class SidebarModule {}
