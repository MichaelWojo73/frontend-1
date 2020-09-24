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
