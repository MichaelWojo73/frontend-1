import { createAction, props } from '@ngrx/store';


export const countIncremented = createAction(
  '[counter] count incremented'
);

export const countDecremented = createAction(
  '[counter] count decremented'
);


export const countReset = createAction(
  '[counter] count reset'
);

export const countBySet = createAction(
  '[counter] count by set',
  props<{ by: number }>()
);
