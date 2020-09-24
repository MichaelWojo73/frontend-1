import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment'; // ONLY IMPORT THIS ONE - never the environment.prod.ts or whatever.
import { BookEntity } from '../reducers/books.reducer';
import * as actions from '../actions/book.actions';
import { of } from 'rxjs';
@Injectable()
export class BookEffects {

  private url = environment.apiUrl;

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
            return of(actions.loadBookDataFailed({ message: 'See the console ' }));
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
