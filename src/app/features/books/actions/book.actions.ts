import { createAction } from '@ngrx/store';
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
