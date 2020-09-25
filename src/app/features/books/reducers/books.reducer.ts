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
  on(actions.loadBookDataSucceeded, (oldState, action) => adapter.setAll(action.payload, oldState)),
  on(actions.bookCreatedFailure, (oldState, action) => adapter.removeOne(action.payload.id, oldState)),
  on(actions.bookCreatedSuccess, (oldState, action) => {
    const tempState = adapter.removeOne(action.oldId, oldState);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.removeBook, (s, a) => adapter.removeOne(a.payload.id, s)),
  on(actions.updatedBookTitle, (s, a) => adapter.updateOne({
    id: a.payload.id,
    changes: {
      title: a.newTitle
    }
  }, s)),
  on(actions.updatedBookTitleFailure, (s, a) => adapter.updateOne({
    id: a.payload.id,
    changes: {
      title: a.payload.title
    }
  }, s))
);

export function reducer(state: BookListState = initialState, action: Action): BookListState {
  return reducerFunction(state, action);
}



