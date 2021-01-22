import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { Tweet } from 'src/app/shared/types';
import { listenTwitterTweets } from '../state/twitter.actions';
import { selectTwitterTweetsPerSecond, TwitterState } from '../state/twitter.reducer';
import { selectTwitterTweets } from '../state/twitter.reducer';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-twitter-dashboard',
  templateUrl: './twitter-dashboard.component.html',
  styleUrls: ['./twitter-dashboard.component.scss']
})
export class TwitterDashboardComponent implements OnInit, OnDestroy {

  private componentDestroy$: Subject<boolean> = new Subject();

  public twitterTweetsPerSecond$: Observable<number> = this.twitterStore.pipe(
    select(selectTwitterTweetsPerSecond),
    filter(state => !!state)
  );
  
  private twitterTweets$: Observable<Tweet[]> = this.twitterStore.pipe(
    select(selectTwitterTweets),
    filter(state => !!state),
    // tap(value => console.log('From component:', value))
  );

  hashTagFilterControl = new FormControl('');

  public filteredTweets$: Observable<Tweet[]> = combineLatest([
    this.twitterTweets$,
    this.hashTagFilterControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([tweets, hashtagValue]) => {
      if (hashtagValue !== '') {
        return tweets.filter(tweet => {
          return !!tweet.message.entities.hashtags.find(hashtag => hashtag.text.startsWith(hashtagValue));
        });
      } else {
        return tweets;
      }
    }),
    // tap(result => console.log(result)),
    takeUntil(this.componentDestroy$)
  );

  ngOnInit(): void {
    this.twitterStore.dispatch(listenTwitterTweets());
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
    this.componentDestroy$.unsubscribe();
  }

  constructor(private twitterStore: Store<TwitterState>) { }

}
