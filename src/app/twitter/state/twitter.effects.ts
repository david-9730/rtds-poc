import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data.service';
import { bufferTime, catchError, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as twitterActions from './twitter.actions';

@Injectable()
export class TwitterEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.listenTwitterTweets),
    switchMap(() => this.dataService.getTwitterRTDataObservable().pipe(
      // tap(result => console.log('From Effect:', result)),
      filter(tweet => !!tweet),
      map(tweet => twitterActions.insertTwitterTweet({payload: tweet})),
      catchError(() => EMPTY)
    ))
  ));

  updateTweetsPerSecond$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.listenTwitterTweets),
    exhaustMap(() => this.dataService.getTwitterRTDataObservable().pipe(
      bufferTime(1000),
      tap(tweets => console.log(tweets.length)),
      map(tweets => twitterActions.updateTweetsPerSecond({payload: tweets.length}))
    ))
  ));

  constructor(private actions$: Actions, private dataService: DataService) {}
}
