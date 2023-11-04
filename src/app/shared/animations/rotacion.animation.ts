import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const ROTATE_ANIMATION = trigger('indicatorRotate', [
  state('collapsed', style({ transform: 'rotate(0deg)' })),
  state('expanded', style({ transform: 'rotate(180deg)' })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
  ),
]);
