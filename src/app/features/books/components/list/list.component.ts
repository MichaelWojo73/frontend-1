import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeBook, updatedBookTitle } from '../../actions/book.actions';
import { BookListItem } from '../../models/book-list-item';
import { BooksState, selectBookListItems } from '../../reducers';
import { BookEntity } from '../../reducers/books.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  isEditing = '-1';
  @Input() books: BookListItem[];
  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {

  }

  edit(bookId: string): void {
    this.isEditing = bookId;
  }

  updateTitle(newTitle: string, book: BookEntity): void {
    this.store.dispatch(updatedBookTitle({ newTitle, payload: book }));
    console.log(`Changed the title to ${newTitle} from ${book.title}`);
    this.isEditing = '-1';
  }

  cancelTitleEdit(): void {
    this.isEditing = '-1';
  }
  removeBook(book: BookEntity): void {
    this.store.dispatch(removeBook({ payload: book }));
  }

}
