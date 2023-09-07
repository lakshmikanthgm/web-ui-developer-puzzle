import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList).pipe(
    shareReplay(1)
  );

  private readonly subscription = new Subscription();

  constructor(
    private readonly matSnackbar: MatSnackBar,
    private readonly store: Store,
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.addLastRemovedBook(item);
  }

  trackByReadinglist(index: number, reading: ReadingListItem) {
    return reading.bookId;
  }

  private addLastRemovedBook(readingList: ReadingListItem) {
    const snackBarRef = this.matSnackbar.open(`${readingList.title} removed.` , 'Undo', {
      duration: 2000
    })
    this.subscription.add(snackBarRef.onAction().subscribe(() => this.store.dispatch(addToReadingList({
      book: {
        ...readingList,
        id: readingList.bookId
      }
    }))))
  }
}
