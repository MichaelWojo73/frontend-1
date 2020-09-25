import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/app.actions';
export interface UiHintsState {
  hasErrors: boolean;
  errorMessage: string;
}

const initialState: UiHintsState = {
  hasErrors: false,
  errorMessage: null
};


const reducerFunction = createReducer(
  initialState,
  on(actions.featureError, (s, a) => ({ ...s, hasErrors: true, errorMessage: a.message })),
  on(actions.featureErrorCleared, () => initialState)
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return reducerFunction(state, action);
}
