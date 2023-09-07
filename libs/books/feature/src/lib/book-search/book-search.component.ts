import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ReadingListBook,
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  books$ = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  term$: Observable<string> = this.searchForm.controls.term.valueChanges

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    const term = this.searchForm.value.term;
    if (term) {
      this.store.dispatch(searchBooks({ term }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  trackByBook(index: number, book: ReadingListBook) {
    return book.id;
  }
}
