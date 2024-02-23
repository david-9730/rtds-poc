import { createAction, props } from '@ngrx/store';
import { Tweet } from 'src/app/shared/types';

export const startListenTwitterTweets = createAction('[Twitter] Start Listen Twitter Tweets');
export const stopListenTwitterTweets = createAction('[Twitter] Stop Listen Twitter Tweets');
export const updateListening = createAction('[Twitter] Update Listening Twitter Tweets', props<{ payload: boolean }>());

export const insertTwitterTweet = createAction('[Twitter] Insert Twitter Tweet', props<{ payload: Tweet }>());
export const deleteFirstTwitterTweet = createAction('[Twitter] Delete First Twitter Tweet');

export const updateTweetsPerSecond = createAction('[Twitter] Update Tweets Per Second', props<{ payload: number }>());
