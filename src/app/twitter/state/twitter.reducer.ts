import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Tweet } from 'src/app/shared/types';
import * as TwitterActions from './twitter.actions';

export interface TwitterState {
  listening: boolean;
  tweets: Tweet[];
  tweetsPerSecond: number;
  deletedTweets: number;
}

export const initialState: TwitterState = {
  listening: false,
  tweets: [],
  tweetsPerSecond: 0,
  deletedTweets: 0
};

const twitterReducer = createReducer(
  initialState,
  on(TwitterActions.updateListening, (state, { payload }) => ({
    ...state,
    listening: payload
  })),
  on(TwitterActions.insertTwitterTweet, (state, { payload }) => ({
    ...state,
    tweets: [ ...state.tweets, payload ]
  })),
  on(TwitterActions.deleteFirstTwitterTweet, (state) => ({
    ...state,
    tweets: state.tweets.slice(1, state.tweets.length),
    deletedTweets: state.deletedTweets + 1
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
export const selectTwitterListening = createSelector(
  selectTwitterState,
  (state: TwitterState) => state.listening
);
export const selectTwitterTweets = createSelector(
  selectTwitterState,
  (state: TwitterState) => state.tweets
);
export const selectTwitterTweetsPerSecond = createSelector(
  selectTwitterState,
  (state: TwitterState) => state.tweetsPerSecond
);
export const selectTwitterDeletedTweets = createSelector(
  selectTwitterState,
  (state: TwitterState) => state.deletedTweets
);
