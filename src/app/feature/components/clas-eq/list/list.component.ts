import { Component, ViewChild, inject } from '@angular/core';
import { DataGridComponent } from '@shared/components/data-grid/component/data-grid.component';
import { IClasEq } from '../interface/clas-eq.interface';
import { CreateComponent } from '../modal/create.component';
import { EditComponent } from '../modal/edit.component';
import { ClasEqService } from '../clas-eq.service';
import { ClassifierListClass } from '@shared/class/classifier-list.class';

@Component({
  selector: 'ai-list-classifier-type',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends ClassifierListClass {
  @ViewChild('tabla')
  override tabla?: DataGridComponent<IClasEq>;

  createComponent = CreateComponent;
  editComponent = EditComponent;

  public service: ClasEqService = inject(ClasEqService);
}
