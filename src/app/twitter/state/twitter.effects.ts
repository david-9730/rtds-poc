import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data.service';
import { bufferCount, bufferTime, catchError, endWith, filter, map, skip, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as twitterActions from './twitter.actions';

@Injectable()
export class TwitterEffects {

  startListen$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.startListenTwitterTweets),
    map(() => {
      return twitterActions.updateListening({ payload: true });
    })
  ));

  stopListen$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.stopListenTwitterTweets),
    map(() => {
      this.dataService.cancelTwitterRTDataListening();
      return twitterActions.updateListening({ payload: false });
    })
  ));

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.updateListening),
    filter(({ payload }) => payload),
    tap(() => console.log('Lets start')),
    switchMap(() => this.dataService.getTwitterRTDataObservable().pipe(
      filter(tweet => !!tweet),
      map(tweet => twitterActions.insertTwitterTweet({payload: tweet})),
      catchError(() => EMPTY)
    ))
  ));

  updateTweetsPerSecond$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.insertTwitterTweet),
    bufferTime(1000),
    endWith([]),
    map(tweets => twitterActions.updateTweetsPerSecond({payload: tweets.length}))
  ));

  removeTweetsOnLimit$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.insertTwitterTweet),
    skip(100),
    map(() => twitterActions.deleteFirstTwitterTweet())
  ));

  constructor(private actions$: Actions, private dataService: DataService) {}
}
