import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ReadingListBook,
  addToReadingList,
  clearSearch,
  getAllBooks,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnDestroy {
  books$ = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  term$: Observable<string> = this.searchForm.controls.term.valueChanges

  private readonly subscription = new Subscription();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly matSnackbar: MatSnackBar
  ) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.removeLastAddedBook(book);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  private removeLastAddedBook(book: Book) {
    const snackBarRef = this.matSnackbar.open(`${book.title} added.` , 'Undo', {
      duration: 2000
    })
    this.subscription.add(snackBarRef.onAction().subscribe(() => this.store.dispatch(removeFromReadingList({
      item: {
        ...book,
        bookId: book.id
      }
    }))))
  }
}
