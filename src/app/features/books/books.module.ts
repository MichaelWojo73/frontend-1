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
const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
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
  declarations: [BooksComponent, ListComponent, EntryComponent, OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    ReactiveFormsModule
  ],
  exports: [BooksComponent]
})
export class BooksModule { }
