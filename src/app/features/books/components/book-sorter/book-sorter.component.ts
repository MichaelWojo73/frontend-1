import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../../actions/book-sort.actions';
import { BooksState, selectSortingByAuthor, selectSortingByTitle } from '../../reducers';
@Component({
  selector: 'app-book-sorter',
  templateUrl: './book-sorter.component.html',
  styleUrls: ['./book-sorter.component.css']
})
export class BookSorterComponent implements OnInit {

  sortingByTitle$: Observable<boolean>;
  sortingByAuthor$: Observable<boolean>;
  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {
    this.sortingByAuthor$ = this.store.pipe(
      select(selectSortingByAuthor)
    );
    this.sortingByTitle$ = this.store.pipe(
      select(selectSortingByTitle)
    );
  }


  changeSortToTitle(): void {
    this.store.dispatch(actions.sortByTitle());
  }

  changeSortToAuthor(): void {
    this.store.dispatch(actions.sortByAuthor());
  }

}
