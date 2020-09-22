import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectCurrent } from '../../reducers';
import * as counterActions from '../../actions/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  current$: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.current$ = this.store.pipe(
      select(selectCurrent)
    );
  }

  increment(): void {
    this.store.dispatch(counterActions.countIncremented());
  }

  decrement(): void {
    this.store.dispatch(counterActions.countDecremented());
  }

  reset(): void {
    this.store.dispatch(counterActions.countReset());
  }

}


