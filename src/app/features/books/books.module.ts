import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EntryComponent } from './components/entry/entry.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StoreModule } from '@ngrx/store';
import { reducers, featureName } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookSorterComponent } from './components/book-sorter/book-sorter.component';
import { EffectsModule } from '@ngrx/effects';
import { BooksAppEffects } from './effects/books-app.effects';
import { HttpClientModule } from '@angular/common/http';
import { BookEffects } from './effects/book.effects';
const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: BookListComponent
      },
      {
        path: 'new',
        component: EntryComponent
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: '**',
        redirectTo: 'overview'
      }
    ]
  }
];

@NgModule({
  declarations: [BooksComponent, ListComponent, EntryComponent, OverviewComponent, BookListComponent, BookSorterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    ReactiveFormsModule,
    EffectsModule.forFeature([BooksAppEffects, BookEffects]),
    HttpClientModule
  ],
  exports: [BooksComponent]
})
export class BooksModule { }
