import { createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
}


export const reducers = {
  counter: fromCounter.reducer,
};


// Selector Functions

// 1 - a selector per "branch" of our state
const selectCounterBranch = (state: AppState) => state.counter;
// 2 - (optionalal) any "helpers"

// 3- What does our component need

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
