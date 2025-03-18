import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user/user.reducer';
import { UserState } from './user/user.model';
import { UserEffects } from './user/user.effects';

export interface AppState {
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer
};

export const effects = [UserEffects];
