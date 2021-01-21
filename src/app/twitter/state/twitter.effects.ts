import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data.service';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as twitterActions from './twitter.actions';

@Injectable()
export class TwitterEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(twitterActions.loadTwitterData),
    mergeMap(() => this.dataService.getTwitterRTData()
    .pipe(
      filter(result => !!result),
      tap(result => console.log('From Effect:', result)),
      map(result => twitterActions.loadTwitterDataSucess({payload: result})),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions, private dataService: DataService) {}
}
