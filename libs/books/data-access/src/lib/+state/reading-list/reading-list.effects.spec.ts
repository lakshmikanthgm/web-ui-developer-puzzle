import { TestBed } from '@angular/core/testing';
import { ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('markBookAsFinished$', () => {
    it('should mark book as finished if Finished API response is success', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.finishedReadingList({ bookId : '1'}));

      const readingList = {
        ...createReadingListItem('1'),
        finished: true,
        finishedDate: '2023-08-07T06:20:47.118Z'
      };

      effects.markBookAsFinished$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.finishedReadingListSuccess({
            updatedReadingList: {
              id: readingList.bookId,
              changes: {
                finished: readingList.finished,
                finishedDate: readingList.finishedDate
              }
            }
          })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/1/finished').flush(readingList);
    });


    it('should update error message if Finished API response is failure', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.finishedReadingList({ bookId : '1'}));
      jest.spyOn((effects as any).http, 'put').mockReturnValue(throwError('Failed'));

      effects.markBookAsFinished$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.finishedReadingListFailure({ error: 'Failed'})
        );
        done();
      });
    });
  });
});
