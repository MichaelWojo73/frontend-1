import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment'; // ONLY IMPORT THIS ONE - never the environment.prod.ts or whatever.
import { BookEntity } from '../reducers/books.reducer';
import * as actions from '../actions/book.actions';
import { of } from 'rxjs';
@Injectable()
export class BookEffects {

  private url = environment.apiUrl;

  // update the title
  updateTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updatedBookTitle),
      switchMap((originalAction) => this.client.put(`${this.url}books/${originalAction.payload.id}/title`,
        JSON.stringify(originalAction.newTitle),
        { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          filter(() => false), // that seemed to have worked
          map(() => ({ type: 'noop' })),
          catchError((err) => of(actions.updatedBookTitleFailure({
            errorMessage: 'Could not update title',
            payload: originalAction.payload
          })))
        )
      )
    )
    , { dispatch: true }
  );
  // bookRemoved -> (nothing | bookRemovedFailure)
  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeBook),
      switchMap(a => this.client.delete(`${this.url}books/${a.payload.id}`)
        .pipe(
          filter(() => false), // My work here is done.
          map(() => ({ type: 'noop' })),
          catchError(() => of(actions.removeBookFailed({ errorMessage: 'Could not remove book', payload: a.payload })))
        )
      )
    ), { dispatch: true }

  );
  // bookCreated -> (bookCreatedSucceeded | bookCreatedFailed)
  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.bookCreated),
      map(a => a.payload), // Actions -> BookEntity
      switchMap(book => this.client.post<BookEntity>(this.url + 'books', getBookCreateFromBook(book))
        .pipe(
          map(payload => actions.bookCreatedSuccess({ oldId: book.id, payload })), // payload -> action (that's going to the reducer)
          catchError((err) => {
            // console.log('Got an error:', err);
            return of(actions.bookCreatedFailure({ message: 'Could not add book', payload: book })); // this is going to the reducer
          })
        )
      )
    ), { dispatch: true }
  );

  // loadBooks -> (loadBookSucceeded | loadBooksFailed)
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBookData),
      switchMap(() => this.client.get<GetBooksResponse>(this.url + 'books')
        .pipe(
          map(results => results.data),
          map(payload => actions.loadBookDataSucceeded({ payload })),
          catchError((err) => {
            console.log('THERE WAS AN ERROR:', err);
            return of(actions.loadBookDataFailed({ message: 'Could Not Load The Books' }));
          })
        )
      )
    ), { dispatch: true }

  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetBooksResponse {
  data: BookEntity[];
}

function getBookCreateFromBook(book: BookEntity): { title: string, author: string, numberOfPages: number } {
  return {
    title: book.title,
    author: book.author,
    numberOfPages: book.numberOfPages
  };
}
