import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, MatSnackBarStub, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { ReadingListItem } from '@tmo/shared/models';
import { addToReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  const readingList: ReadingListItem = createReadingListItem('1');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, BrowserAnimationsModule],
      providers: [ { provide: MatSnackBar , useClass: MatSnackBarStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trackByReadinglist method return unique id', () => {
    expect(component.trackByReadinglist(1, {bookId: '1'} as ReadingListItem)).toEqual('1');
  })

  it('should remove book to reading list and show snack bar', () => {
    const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');
    const addLastRemovedBookSpy = jest.spyOn((component as any), 'addLastRemovedBook');
  
    component.removeFromReadingList(readingList);
  
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({item: readingList}));
    expect(addLastRemovedBookSpy).toHaveBeenCalledWith(readingList);
  });

  it('should undo last action by dispatching addToReadingList', () => {
    const matSnackbarOpenSpy = jest.spyOn((component as any).matSnackbar, 'open');
    const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');

    component['addLastRemovedBook'](readingList);

    expect(matSnackbarOpenSpy).toHaveBeenCalledWith('Book 1 removed.', 'Undo', { duration: 2000 });
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({book: {
      ...readingList,
      id: readingList.bookId
    }}));
  });
});
