import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BooksState, selectBooksLoaded } from './reducers';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  booksLoaded$: Observable<boolean>;
  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {
    this.booksLoaded$ = this.store.pipe(
      select(selectBooksLoaded)
    );
  }

}
