import { Action } from '@ngrx/store';

export interface CounterState {
  current: number;
}

const initialState: CounterState = {
  current: 0
};

export function reducer(oldState: CounterState = initialState, action: Action): CounterState {
  switch (action.type) {
    case 'increment': {
      return {
        current: oldState.current + 1
      };
    }
    case 'decrement': {
      return {
        current: oldState.current - 1
      };
    }
    case 'reset': {
      return initialState;

    }
    default:
      return oldState;
  }
}
