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

const selectBookListItemsUnsorted = createSelector(
  selectBooksArray,
  b => b as BookListItem[]
);
// 4. What our Components Need

// TODO: BookListItem[]

export const selectBooksLoaded = createSelector(
  selectUiHintsBranch,
  b => b.booksLoaded
);

export const selectBookListItems = createSelector(
  selectBookListItemsUnsorted,
  selectSortingBy,
  (list, by) => {
    return [...list.sort((lhs, rhs) => {
      if (lhs[by] < rhs[by]) {
        return -1;
      }
      if (lhs[by] > rhs[by]) {
        return 1;
      }
      return 0;
    })];
  }
);


// selectBookListItems
export const selectSortingByTitle = createSelector(
  selectSortingBy,
  b => b === 'title'
);

export const selectSortingByAuthor = createSelector(
  selectSortingBy,
  b => b === 'author'
);
