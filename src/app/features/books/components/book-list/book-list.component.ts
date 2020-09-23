import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookListItem } from '../../models/book-list-item';
import { BooksState, selectBookListItems } from '../../reducers';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  list$: Observable<BookListItem[]>;
  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {
    this.list$ = this.store.pipe(
      select(selectBookListItems)
    );
  }

}
