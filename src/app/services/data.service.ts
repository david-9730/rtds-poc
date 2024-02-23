import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../../environments/environment';
import { Tweet } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private channel: string;
  private twitterPubNubSubscribeKey = environment.twitterPubNubSubscribeKey;
  private messages$?: Subject<Tweet>;

  constructor(private pubnub: PubNubAngular) {
    this.channel = 'pubnub-twitter';
    this.pubnub = pubnub;
    this.pubnub.init({
      subscribeKey: this.twitterPubNubSubscribeKey
    });
  }

  getTwitterRTDataObservable(): Observable<Tweet> {
    this.messages$ = new Subject();

    this.pubnub.getMessage(this.channel, msg => {
      this.messages$!.next(msg);
    });

    this.pubnub.subscribe({
        channels: [this.channel],
        triggerEvents: ['message']
    });

    return this.messages$.asObservable();
  }

  cancelTwitterRTDataListening() {
    this.pubnub.unsubscribe({
      channels: [this.channel],
      triggerEvents: ['message']
    });

    this.messages$!.complete();
  }
}
