import { createAction } from '@ngrx/store';

export const sortByTitle = createAction(
  '[books sort] sort by title'
);

export const sortByAuthor = createAction(
  '[books sort] sort by author'
);
