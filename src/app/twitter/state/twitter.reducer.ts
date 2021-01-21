import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as TwitterActions from './twitter.actions';

export interface TwitterState {
  tweets: any[];
}

export const initialState: TwitterState = {
  tweets: []
};

const twitterReducer = createReducer(
  initialState,
  on(TwitterActions.loadTwitterDataSucess, (state, { payload }) => ({
    ...state,
    tweets: [ ...state.tweets, payload ]
  })),
);

export function reducer(state: TwitterState | undefined, action: Action) {
  return twitterReducer(state, action);
}

// Selectors
export const selectTwitterState = createFeatureSelector<TwitterState>('twitter');
