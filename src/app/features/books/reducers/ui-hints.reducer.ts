import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/book-sort.actions';

export interface UiHintsState {
  sortBooksBy: string;
}

const initialState: UiHintsState = {
  sortBooksBy: 'title'
};


const reducerFunction = createReducer(
  initialState,
  on(actions.sortByAuthor, (s, a) => ({ ...s, sortBooksBy: 'author' })),
  on(actions.sortByTitle, (s, a) => ({ ...s, sortBooksBy: 'title' }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return reducerFunction(state, action);
}
