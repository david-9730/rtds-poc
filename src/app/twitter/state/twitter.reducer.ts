import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Tweet } from 'src/app/shared/types';
import * as TwitterActions from './twitter.actions';

export interface TwitterState {
  tweets: Tweet[];
  tweetsPerSecond: number;
}

export const initialState: TwitterState = {
  tweets: [],
  tweetsPerSecond: 0
};

const twitterReducer = createReducer(
  initialState,
  on(TwitterActions.insertTwitterTweet, (state, { payload }) => ({
    ...state,
    tweets: [ ...state.tweets, payload ]
  })),
  on(TwitterActions.updateTweetsPerSecond, (state, { payload }) => ({
    ...state,
    tweetsPerSecond: payload
  }))
);

export function reducer(state: TwitterState | undefined, action: Action): TwitterState {
  return twitterReducer(state, action);
}

// Selectors
export const selectTwitterState = createFeatureSelector<TwitterState>('twitter');
export const selectTwitterTweets = createSelector(
  selectTwitterState,
  (state: TwitterState) => state.tweets
);
export const selectTwitterTweetsPerSecond = createSelector(
  selectTwitterState,
  (state: TwitterState) => state.tweetsPerSecond
);
