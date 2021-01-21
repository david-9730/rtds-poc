import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { loadTwitterData } from '../state/twitter.actions';
import { TwitterState } from '../state/twitter.reducer';
import { selectTwitterState } from '../state/twitter.reducer';

@Component({
  selector: 'app-twitter-dashboard',
  templateUrl: './twitter-dashboard.component.html',
  styleUrls: ['./twitter-dashboard.component.scss']
})
export class TwitterDashboardComponent implements OnInit {

  ngOnInit(): void {
    this.twitterStore.pipe(
      tap((result: any) => console.log('From Component without select', result)),
      select(selectTwitterState)
    ).subscribe(msg => {
      console.log('From Component with State', msg);
    });

    // this.twitterStore.dispatch(loadTwitterData());
  }

  constructor(private twitterStore: Store<TwitterState>) { }

}
