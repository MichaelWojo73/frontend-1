import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSorterComponent } from './book-sorter.component';

describe('BookSorterComponent', () => {
  let component: BookSorterComponent;
  let fixture: ComponentFixture<BookSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSorterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
