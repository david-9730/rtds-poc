import { createAction, props } from '@ngrx/store';
import { Tweet } from 'src/app/shared/types';

export const listenTwitterTweets = createAction('[Twitter] Listen Twitter Tweets');

export const insertTwitterTweet = createAction('[Twitter] Insert Twitter Tweet', props<{ payload: Tweet }>());

export const updateTweetsPerSecond = createAction('[Twitter] Update Tweets Per Second', props<{ payload: number }>());
