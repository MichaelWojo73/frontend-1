import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { applicationStarted } from './actions/app.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular Application';

  constructor(private store: Store<AppState>) {
    store.dispatch(applicationStarted());
  }
  // void DoIt() { }
  doIt(): void {
    this.title = this.title.toUpperCase();

  }
}
