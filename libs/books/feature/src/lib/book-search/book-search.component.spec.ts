import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, MatSnackBarStub, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { addToReadingList, ReadingListBook, removeFromReadingList } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  const book: Book = createBook('1');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [ { provide: MatSnackBar , useClass: MatSnackBarStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should trackByBook method return unique id', () => {
    expect(component.trackByBook(1, {id: '1'} as ReadingListBook)).toEqual('1');
  });

  it('should add book to reading list and show snack bar', () => {
    const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');
    const removeLastAddedBookSpy = jest.spyOn((component as any), 'removeLastAddedBook');
  
    component.addBookToReadingList(book);

    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({book}));
    expect(removeLastAddedBookSpy).toHaveBeenCalledWith(book);
  });

  it('should undo last action by dispatching removeFromReadingList', () => {
    const matSnackbarOpenSpy = jest.spyOn((component as any).matSnackbar, 'open');
    const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');

    component['removeLastAddedBook'](book);

    expect(matSnackbarOpenSpy).toHaveBeenCalledWith('Book 1 added.', 'Undo', { duration: 2000 });
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({item: {
      ...book,
      bookId: book.id
    }}));
  });
});
