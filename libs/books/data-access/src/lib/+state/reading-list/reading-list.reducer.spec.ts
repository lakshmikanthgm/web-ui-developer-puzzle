import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  let state: State;

  beforeEach(() => {
    state = readingListAdapter.setAll(
      [createReadingListItem('A'), createReadingListItem('B')],
      initialState
    );
  });

  describe('valid Books actions', () => {
    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('failedAddToReadingList should undo book addition to the state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        book: createBook('B')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B']);
    });

    it('failedRemoveFromReadingList should undo book removal from the state', () => {
      const action = ReadingListActions.failedRemoveFromReadingList({
        item: createReadingListItem('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B']);
    });
  });

  describe('Finsished Book Actions', () => {
    it('finishedReadingListSuccess should upadte the book in the state', () => {
      const action = ReadingListActions.finishedReadingListSuccess({
        updatedReadingList: {
          id: 'B',
          changes: {
            finished: true,
            finishedDate: '2023-08-07T06:20:47.118Z'
          }
        }
      });

      const result: State = reducer(state, action);

      expect(result.entities['B'].finished).toBeTruthy();
      expect(result.entities['B'].finishedDate).toEqual('2023-08-07T06:20:47.118Z');
    });

    it('finishedReadingListFailure should upadte the book in the state', () => {
      const action = ReadingListActions.finishedReadingListFailure({
        error: 'Failed to update.'
      });

      const result: State = reducer(state, action);

      expect(result.updateError).toEqual('Failed to update.');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
