import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface State {
  data: Array<any>;
}

export const initialState: State = {
  data: []
};

const appDataReducer = createReducer(
  initialState,
  on(AppActions.loadDataSuccess, (state, { payload }) => ({
    ...state,
    data: payload
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return appDataReducer(state, action);
}
