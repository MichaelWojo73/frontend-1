import { Action, createReducer, on } from '@ngrx/store';
import * as sortActions from '../actions/book-sort.actions';
import * as bookActions from '../actions/book.actions';

export interface UiHintsState {
  sortBooksBy: string;
  booksLoaded: boolean;
}

const initialState: UiHintsState = {
  sortBooksBy: 'title',
  booksLoaded: false
};


const reducerFunction = createReducer(
  initialState,
  on(sortActions.sortByAuthor, (s, a) => ({ ...s, sortBooksBy: 'author' })),
  on(sortActions.sortByTitle, (s, a) => ({ ...s, sortBooksBy: 'title' })),
  on(bookActions.loadBookDataSucceeded, (s) => ({ ...s, booksLoaded: true })),
  on(bookActions.loadBookData, bookActions.loadBookDataFailed, (s) => ({ ...s, booksLoaded: false }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return reducerFunction(state, action);
}
