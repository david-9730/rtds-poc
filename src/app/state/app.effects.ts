import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadData),
    mergeMap(() => this.dataService.getRealTimeData()
    .pipe(
      map(result => appActions.loadDataSuccess({payload: result})),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions, private dataService: DataService) {}
}
