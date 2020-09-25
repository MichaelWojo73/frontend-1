import { createAction, props } from '@ngrx/store';

export const applicationStarted = createAction(
  '[App] APPLICATION_STARTED'
);

export const featureErrorCleared = createAction(
  '[app] feature error cleared'
);
export const featureError = createAction(
  '[app] feature had an error',
  props<{ feature: string, message: string }>()
);

