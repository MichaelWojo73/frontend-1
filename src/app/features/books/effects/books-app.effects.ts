import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as bookActions from '../actions/book.actions';

@Injectable()
export class BooksAppEffects {

  // turn our feature errors into a application feature errors
  onLoadBooksFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookActions.loadBookDataFailed),
      map(e => appActions.featureError({ feature: 'Books', message: e.message }))
    )
    , { dispatch: true }
  );

  onAddBookFailed$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookActions.bookCreatedFailure),
      map(e => appActions.featureError({ feature: 'Books', message: e.message }))
    )
    , { dispatch: true }
  );

  // ApplicationStarted -> loadTheData
  onApplicationStartedLoadBooks$ = createEffect(() =>
    this.action$.pipe(
      ofType(appActions.applicationStarted),
      map(() => bookActions.loadBookData())
    )
  );


  constructor(private action$: Actions) { }
}
