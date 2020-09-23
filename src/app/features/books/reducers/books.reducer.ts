import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/book.actions';
export interface BookEntity {
  id: string;
  title: string;
  author: string;
  numberOfPages: number;
}

export interface BookListState extends EntityState<BookEntity> {

}

export const adapter = createEntityAdapter<BookEntity>();

// const initialState = adapter.getInitialState();
const initialState: BookListState = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', title: 'Object Oriented Ontology', author: 'Harman', numberOfPages: 217 },
    2: { id: '2', title: 'Music Theory for Computer Musicians', author: 'Hewitt', numberOfPages: 189 }
  }
};

const reducerFunction = createReducer(
  initialState,
  on(actions.bookCreated, (oldState, action) => adapter.addOne(action.payload, oldState))
);

export function reducer(state: BookListState = initialState, action: Action) {
  return reducerFunction(state, action);
}



