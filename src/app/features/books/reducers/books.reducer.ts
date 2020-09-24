import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/book.actions';
import { BookListItem } from '../models/book-list-item';
export interface BookEntity {
  id: string;
  title: string;
  author: string;
  numberOfPages: number;
}

export interface BookListState extends EntityState<BookEntity> {

}

export const adapter = createEntityAdapter<BookEntity>();

const initialState = adapter.getInitialState();


const reducerFunction = createReducer(
  initialState,
  on(actions.bookCreated, (oldState, action) => adapter.addOne(action.payload, oldState)),
  on(actions.loadBookDataSucceeded, (oldState, action) => adapter.setAll(action.payload, oldState))
);

export function reducer(state: BookListState = initialState, action: Action): BookListState {
  return reducerFunction(state, action);
}



