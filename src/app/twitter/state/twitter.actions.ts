import { createAction, props } from '@ngrx/store';

export const loadTwitterData = createAction('[App] Load Twitter Data');
export const loadTwitterDataSucess = createAction('[App] Load Twitter Data Success', props<{ payload: any }>());
