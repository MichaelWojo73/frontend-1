import { createAction, props } from '@ngrx/store';
import { BookEntity } from '../reducers/books.reducer';

let currentId = 1;

export const bookCreated = createAction(
  '[books] book created',
  ({ title, author, numberOfPages }: BookCreate) => ({
    payload: {
      title,
      author,
      numberOfPages,
      id: 'T' + currentId++
    } as BookEntity
  })
);

export const bookCreatedSuccess = createAction(
  '[books] book was created successfully',
  props<{ oldId: string, payload: BookEntity }>()
);

export const bookCreatedFailure = createAction(
  '[books] book creation failed',
  props<{ message: string, payload: BookEntity }>()
);



interface BookCreate {
  title: string;
  author: string;
  numberOfPages: number;
}


// Initiating Actions (go do this thing)
export const loadBookData = createAction(
  '[books] load book data'
);
// A success action (that thing worked)
export const loadBookDataSucceeded = createAction(
  '[books] loading book data succeeded',
  props<{ payload: BookEntity[] }>()
);
// A failure action (that did NOT work.)
export const loadBookDataFailed = createAction(
  '[books] loading book data failed',
  props<{ message: string }>()
);
