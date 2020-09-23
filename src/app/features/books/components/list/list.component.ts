import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookListItem } from '../../models/book-list-item';
import { BooksState, selectBookListItems } from '../../reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() books: BookListItem[];
  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {

  }

}
