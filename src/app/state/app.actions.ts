import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[App] Load Initial Data');
export const loadDataSuccess = createAction('[App] Load Initial Data Success', props<{ payload: any }>());
