import * as fromBooks from './books.reducer';
import * as fromUiHints from './ui-hints.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BookListItem } from '../models/book-list-item';
export const featureName = 'booksFeature';

export interface BooksState {
  list: fromBooks.BookListState;
  uiHints: fromUiHints.UiHintsState;
}


export const reducers: ActionReducerMap<BooksState> = {
  list: fromBooks.reducer,
  uiHints: fromUiHints.reducer
};


// 1. Feature Selector
const selectFeature = createFeatureSelector<BooksState>(featureName);

// 2. Selector Per Branch

const selectListBranch = createSelector(
  selectFeature,
  f => f.list
);

const selectUiHintsBranch = createSelector(
  selectFeature,
  f => f.uiHints
);


// 3. Helpers (Optional)

const { selectAll: selectBooksArray } = fromBooks.adapter.getSelectors(selectListBranch);

const selectSortingBy = createSelector(
  selectUiHintsBranch,
  b => b.sortBooksBy
);

// 4. What our Components Need

// TODO: BookListItem[]

export const selectBookListItems = createSelector(
  selectBooksArray,
  b => b as BookListItem[]
);

export const selectSortingByTitle = createSelector(
  selectSortingBy,
  b => b === 'title'
);

export const selectSortingByAuthor = createSelector(
  selectSortingBy,
  b => b === 'author'
);
