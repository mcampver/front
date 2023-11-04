import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const indicatorRotate = trigger('indicatorRotate', [
  state('collapsed', style({ transform: 'rotate(0deg)' })),
  state('expanded', style({ transform: 'rotate(180deg)' })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
  ),
]);
export const panelExpandedTrigger = trigger('panelExpandedTrigger', [
  transition(':enter', [
    style({ height: '0' }),
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
  ]),
  transition(':leave', [
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)', style({ height: '0' })),
  ]),
]);
