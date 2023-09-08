import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { finishedReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList).pipe(
    shareReplay(1)
  );

  constructor(private readonly store: Store) {}

  markBookAsFinished(item: ReadingListItem) {
    this.store.dispatch(finishedReadingList({ bookId: item.bookId }))
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  trackByReadinglist(index: number, reading: ReadingListItem) {
    return reading.bookId;
  }
}
