import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { BaseRoutingModule } from './base-routing.module';

import { HeaderComponent } from '@shared/components/header/header.component';
import { BaseComponent } from './base.component';
import { ToggleThemeComponent } from '@shared/components/toggle-theme/toggle-theme.component';
import { ProfileComponent } from '@shared/components/profile/profile.component';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { MenuItems } from '@shared/components/menu-items/menu-items';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    ToggleThemeComponent,
    ProfileComponent,
  ],
  imports: [
    MatTooltipModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    BaseRoutingModule,
    MatToolbarModule,
    MatListModule,
    CommonModule,
    MatMenuModule,
    SidebarModule,
  ],
  exports: [BaseComponent],
  providers: [MenuItems],
})
export class BaseModule {}
