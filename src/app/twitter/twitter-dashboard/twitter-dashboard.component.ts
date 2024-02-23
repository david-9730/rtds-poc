import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { Tweet } from 'src/app/shared/types';
import { selectTwitterListening, selectTwitterTweetsPerSecond, TwitterState } from '../state/twitter.reducer';
import { selectTwitterTweets } from '../state/twitter.reducer';
import { FormControl } from '@angular/forms';
import { startListenTwitterTweets, stopListenTwitterTweets } from '../state/twitter.actions';

@Component({
  selector: 'app-twitter-dashboard',
  templateUrl: './twitter-dashboard.component.html',
  styleUrls: ['./twitter-dashboard.component.scss']
})
export class TwitterDashboardComponent implements OnDestroy {

  private componentDestroy$: Subject<boolean> = new Subject();

  public twitterTweetsPerSecond$: Observable<number> = this.twitterStore.pipe(
    select(selectTwitterTweetsPerSecond),
  );

  public twitterTweets$: Observable<Tweet[]> = this.twitterStore.pipe(
    select(selectTwitterTweets),
    filter(state => !!state)
  );

  public twitterListening$: Observable<boolean> = this.twitterStore.pipe(
    select(selectTwitterListening)
  );

  hashTagFilterControl = new FormControl('');

  public filteredTweets$: Observable<Tweet[]> = combineLatest([
    this.twitterTweets$,
    this.hashTagFilterControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([tweets, hashtagValue]) => {
      if (hashtagValue !== '') {
        return tweets.filter(tweet => {
          return !!tweet.message.entities.hashtags.find(hashtag => hashtag.text.toLowerCase().includes(hashtagValue));
        });
      } else {
        return tweets;
      }
    }),
    takeUntil(this.componentDestroy$)
  );

  onStartListeningTweetsClick(): void {
    this.twitterStore.dispatch(startListenTwitterTweets());
  }

  onStopListeningTweetsClick(): void {
    this.twitterStore.dispatch(stopListenTwitterTweets());
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
    this.componentDestroy$.unsubscribe();
  }

  constructor(private twitterStore: Store<TwitterState>) { }

}
