import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './user.model';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.signUp, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.signUpSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
    error: null
  })),

  on(UserActions.signUpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.signOut, (state) => ({
    ...state,
    currentUser: null
  }))
);
