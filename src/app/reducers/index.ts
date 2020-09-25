import { createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';
import * as fromUiHints from './ui-hints.reducer';
export interface AppState {
  counter: fromCounter.CounterState;
  uiHints: fromUiHints.UiHintsState;
}


export const reducers = {
  counter: fromCounter.reducer,
  uiHints: fromUiHints.reducer
};


// Selector Functions

// 1 - a selector per "branch" of our state
const selectCounterBranch = (state: AppState) => state.counter;
const selectUiHintsBranch = (state: AppState) => state.uiHints;
// 2 - (optionalal) any "helpers"

// 3- What does our component need

export const selectHasError = createSelector(
  selectUiHintsBranch,
  b => b.hasErrors
);
export const selectErrorMessage = createSelector(
  selectUiHintsBranch,
  b => b.errorMessage
);
// export function selectCurrent(state: AppState): number {
//   return state.counter.current;
// }

export const selectCurrent = createSelector(
  selectCounterBranch,
  b => b.current
);

export const selectCountBy = createSelector(
  selectCounterBranch,
  b => b.by
);
