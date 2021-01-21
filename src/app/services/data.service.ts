import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PubNubAngular } from 'pubnub-angular2';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  channel: string;

  constructor(private pubnub: PubNubAngular) {
    this.channel = 'pubnub-twitter';
    this.pubnub = pubnub;
  }

  getTwitterRTData(): Observable<any> {

    const messages$ = new BehaviorSubject<any>(null);

    this.pubnub.init({
      subscribeKey: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });

    this.pubnub.getMessage(this.channel, msg => {
      console.log('From Service:', msg);
      messages$.next(msg);
    });

    this.pubnub.subscribe({
        channels: [this.channel],
        withPresence: true,
        triggerEvents: ['message', 'presence', 'status']
    });

    return messages$.asObservable();
  }
}
