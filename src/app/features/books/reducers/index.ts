import * as fromBooks from './books.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BookListItem } from '../models/book-list-item';
export const featureName = 'booksFeature';

export interface BooksState {
  list: fromBooks.BookListState;
}


export const reducers: ActionReducerMap<BooksState> = {
  list: fromBooks.reducer
};


// 1. Feature Selector
const selectFeature = createFeatureSelector<BooksState>(featureName);

// 2. Selector Per Branch

const selectListBranch = createSelector(
  selectFeature,
  f => f.list
);


// 3. Helpers (Optional)

const { selectAll: selectBooksArray } = fromBooks.adapter.getSelectors(selectListBranch);


// 4. What our Components Need

// TODO: BookListItem[]

export const selectBookListItems = createSelector(
  selectBooksArray,
  b => b as BookListItem[]
);
