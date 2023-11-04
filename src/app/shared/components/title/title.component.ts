import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'ai-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  standalone: true,
  imports: [MatDividerModule],
})
export class TitleComponent {}
