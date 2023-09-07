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
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

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

  term$: Observable<string> = this.searchForm.controls.term.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(this.searchBooks.bind(this))
  );
  
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks(this.searchForm.value.term);
  }

  searchBooks(term: string) {
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
