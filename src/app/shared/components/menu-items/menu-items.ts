// @Autor:Gianni Martinez
import { Injectable } from '@angular/core';
import { INavItem } from '../sidebar/menu-list-item/nav-item';

@Injectable()
export class MenuItems {
  private _menuItem: INavItem[] = [
    {
      displayName: 'Nomencladores',
      iconName: 'grid_view',
      children: [
        {
          displayName: 'Personas y cargos',
          iconName: '',
          route: 'nomenclators/people',
        },
        {
          displayName: 'Equipos',
          iconName: '',
          children: [
            {
              displayName: 'Tipos de maquinaria',
              iconName: '',
              route: 'equipsGeneral/equips/machinery-type',
            },
            {
              displayName: 'Tipos de motor',
              iconName: '',
              route: 'nomenclators/equips/types-motor',
            },
            {
              displayName: 'Situaciones actuales',
              iconName: '',
              route: 'nomenclators/equips/act-sit',
            },
            {
              displayName: 'Estados técnicos',
              iconName: '',
              route: 'nomenclators/equips/tech-states',
            },
            {
              displayName: 'Grupos de equipos',
              iconName: '',
              route: 'nomenclators/equips/eq-groups',
            },
            {
              displayName: 'Tipos de equipos',
              iconName: '',
              route: 'equipsGeneral/equips/equip-types',
            },
            {
              displayName: 'Marcas',
              iconName: '',
              route: 'equipsGeneral/equips/brands',
            },
            {
              displayName: 'Modelos',
              iconName: '',
              route: 'equipsGeneral/equips/models',
            },
            {
              displayName: 'Clasificadores de equipos',
              iconName: '',
              route: 'nomenclators/equips/clas-eq',
            },
            {
              displayName: 'Tipos de combustibles',
              iconName: '',
              route: 'nomenclators/equips/clas-eq',
            },
          ],
        },
        {
          displayName: 'Bajas',
          children: [
            {
              displayName: 'Componentes de baja',
              iconName: '',
              route: 'equipsGeneral/equips/low-components',
            },
            {
              displayName: 'Estado de componentes',
              iconName: '',
              route: 'equipsGeneral/equips/state-low-components',
            },
          ],
        },
        {
          displayName: 'Explotación',
          children: [
            {
              displayName: 'Operaciones',
              route: 'exploitation/ops',
            },
            {
              displayName: 'Tipos de combustibles',
              route: 'exploitation/types_fuel',
            },
            {
              displayName: 'Normas de Equipos',
              route: 'exploitation/equipment_standards',
            },
            {
              displayName: 'Conceptos del Modelo 126254',
              route: 'exploitation/model_126254',
            },
          ],
        },
      ],
    },
    {
      displayName: 'Inventario',
      iconName: 'grid_view',
      children: [
        {
          displayName: 'Inventario de equipos',
          route: 'inv-eq',
        },
        {
          displayName: 'Solicitudes de baja',
          route: '',
        },
        {
          displayName: 'Reportes',
          children: [
            {
              displayName: 'Reportes de inventario',
              children: [
                {
                  displayName: 'Tabla 415',
                  route: 'reports/table145',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  getMenuitem(): INavItem[] {
    return this._menuItem;
  }
}
