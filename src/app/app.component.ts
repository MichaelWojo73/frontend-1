import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular Application';

  // void DoIt() { }
  doIt(): void {
    this.title = this.title.toUpperCase();

  }
}
