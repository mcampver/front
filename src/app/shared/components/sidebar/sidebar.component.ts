import { Component } from '@angular/core';
import { MenuItems } from '../menu-items/menu-items';

@Component({
  selector: 'ai-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class AiSidebarComponent {
  constructor(public menuItems: MenuItems) {}
}
