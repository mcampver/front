// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'nomenclators',
        children: [
          {
            path: 'people',
            loadChildren: () =>
              import('../people/people.module').then((m) => m.PeopleModule),
          },
          {
            path: 'equips/types-motor',
            loadChildren: () =>
              import('../types-motor/types-motor.module').then(
                (m) => m.TypesMotorModule
              ),
          },
          {
            path: 'equips/act-sit',
            loadChildren: () =>
              import('../act-sit/act-sit.module').then((m) => m.ActSitModule),
          },
          {
            path: 'equips/tech-states',
            loadChildren: () =>
              import('../tech-states/tech-states.module').then(
                (m) => m.TechStatesModule
              ),
          },
          {
            path: 'equips/eq-groups',
            loadChildren: () =>
              import('../eq-groups/eq-groups.module').then(
                (m) => m.EqGroupsModule
              ),
          },
          {
            path: 'equips/clas-eq',
            loadChildren: () =>
              import('../clas-eq/clas-eq.module').then((m) => m.ClasEqModule),
          },
        ],
      },
      {
        path: 'equipsGeneral',
        children: [
          {
            path: 'equips/equip-types',
            loadChildren: () =>
              import('../equip-types/equip-types.module').then(
                (m) => m.EquipTypesModule
              ),
          },
          {
            path: 'equips/brands',
            loadChildren: () =>
              import('../brands/brands.module').then((m) => m.BrandModule),
          },
          {
            path: 'equips/models',
            loadChildren: () =>
              import('../gest-models/gest-models.module').then(
                (m) => m.GestModelsModule
              ),
          },
          {
            path: 'equips/machinery-type',
            loadChildren: () =>
              import('../machinery-type/machinery-type.module').then(
                (m) => m.MachineryTypeModule
              ),
          },
          {
            path: 'equips/low-components',
            loadChildren: () =>
              import('../low-components/low-components.module').then(
                (m) => m.LowComponentsModule
              ),
          },
          {
            path: 'equips/state-low-components',
            loadChildren: () =>
              import(
                '../state-low-components/state-low-components.module'
              ).then((m) => m.StateLowComponentsModule),
          },
        ],
      },
      {
        path: 'exploitation',
        children: [
          {
            path: 'ops',
            loadChildren: () =>
              import('../exploitation/ops/ops.module').then((m) => m.OpsModule),
          },
        ],
      },
      {
        path: 'inv-eq',
        loadChildren: () =>
          import('../inv-eq/inv-eq.module').then((m) => m.InvEqModule),
      },
    ],
  },

  { path: '', redirectTo: 'nomenclators', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
