import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';
import { countBySet } from '../actions/counter.actions';
import { applicationStarted } from '../actions/app.actions';
@Injectable()
export class CounterEffects {


  // 2. Whenever applicationStarted -> check the localStorage for 'by'. If it is there, dispatch, if it isn't, don't.
  readBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationStarted),
      map(() => localStorage.getItem('by')), // "1", "3", "5" || null
      filter(by => by !== null), // STOP || "1", "3", "5"
      map(by => parseInt(by, 10)), // turn it into a base10 number (1,3,5)
      filter(by => by === 1 || by === 3 || by === 5),
      map(by => countBySet({ by })) // an action that will be given to the reducer
    ), { dispatch: true }
  );

  // 1. whenever we get an action of type countBySet - we are going to save it localstorage. then do nothing.
  saveBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countBySet), // Every Action -> countBySet actions
      map(action => action.by), // countBySet -> by:number
      map(by => by.toString()), // number -> string
      tap(by => localStorage.setItem('by', by)) // string -> string
    ), { dispatch: false } // don't try to put that string in the reducer function as an action
  );

  constructor(private actions$: Actions) { }
}
