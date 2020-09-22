import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';

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
      select(s => s.counter.current)
    );
  }

  increment(): void {
    this.store.dispatch({ type: 'increment' });
  }

  decrement(): void {
    this.store.dispatch({ type: 'decrement' });
  }

  reset(): void {
    this.store.dispatch({ type: 'reset' });
  }

}
