import * as fromCounter from './counter.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
}


export const reducers = {
  counter: fromCounter.reducer
};
